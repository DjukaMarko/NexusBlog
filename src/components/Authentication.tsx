"use client"
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Authentication() {
    const { isSignedIn, user } = useUser();
    return (
        <div className="mb-4">
            {isSignedIn && <p className="text-4xl mb-4">Welcome, {user.fullName}</p>}
            {
                !isSignedIn ?
                    <SignInButton>
                        <button className="border-2 border-black py-2 px-4 rounded-lg hover:bg-black hover:text-white">Sign In</button>
                    </SignInButton>
                    :
                    <SignOutButton>
                        <button className="border-2 border-black py-2 px-4 rounded-lg hover:bg-black hover:text-white">Sign Out</button>
                    </SignOutButton>
            }
        </div>
    )
}