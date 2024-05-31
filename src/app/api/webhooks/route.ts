import { createHmac } from 'crypto';
import { headers } from 'next/headers';
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Compute the HMAC SHA256 hash
    const computedSignature = createHmac('sha256', WEBHOOK_SECRET)
        .update(`${svix_id}.${svix_timestamp}.${body}`)
        .digest('hex');

    // Remove the version prefix (e.g., "v1,") from the svix_signature
    const signature = svix_signature.replace('v1,', '');

    // Compare the computed signature with the svix_signature
    if (computedSignature !== signature) {
        return new Response('Error occurred -- invalid signature', { status: 400 });
    }

    // Assuming the signature is valid, process the event
    if (payload.type === 'user.created') {
        try {
            await prisma.user.create({
                data: {
                    id: payload.data.id,
                    email: payload.data.email_addresses[0].email_address,
                    name: `${payload.data.first_name} ${payload.data.last_name}`,
                    role: "user",
                },
            });
        } catch (err) {
            console.error('Error creating user:', err);
            return new Response('Error occurred while creating user', { status: 500 });
        }
    }

    return new Response('success', { status: 200 });
}
