import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    console.log("request!");

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    console.log("before headers")

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    console.log(svix_id, svix_timestamp, svix_signature);

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    console.log(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', { status: 400 });
    }

    if (evt.type === 'user.created') {
        console.log('userId:', evt.data.id);
        console.log(evt.data);

        try {
            await prisma.user.create({
                data: {
                    id: evt.data.id,
                    email: evt.data.email_addresses[0].email_address,
                    name: `${evt.data.first_name} ${evt.data.last_name}`,
                    role: "user",
                },
            });
        } catch (err) {
            console.error('Error creating user:', err);
            return new Response('Error occurred while creating user', { status: 500 });
        }
    } else {
        console.log("whatt??")
    }
    console.log("ende")

    return new Response('success', { status: 200 });
}
