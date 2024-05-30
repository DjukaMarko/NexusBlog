"use client"
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { FilePlus2, LogOut } from "lucide-react";

export default function Authentication() {
    const { isSignedIn, user } = useUser();
    return (
        <div className="flex space-x-4 items-center">
            {isSignedIn && <p className="text-xl">Welcome, {user.fullName}</p>}
            {
                !isSignedIn ?
                    <SignInButton>
                        <button className="border-[1px] border-black py-1 px-4 rounded-lg hover:bg-black hover:text-white">Sign In</button>
                    </SignInButton>
                    :
                    <div className="flex space-x-2 items-center">
                        <SignOutButton>
                            <div className="w-max p-1 rounded-lg cursor-pointer hover:bg-black/10 border-[1px] border-black">
                                <LogOut size={24} />
                            </div>
                        </SignOutButton>

                        <div className="w-max p-1 rounded-lg cursor-pointer hover:bg-black/10 border-[1px] border-black">
                            <FilePlus2 size={24} />
                        </div>
                    </div>
            }
        </div>
    )
}