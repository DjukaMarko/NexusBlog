"use server"

import { serverCaller } from "@/server";
import { redirect } from "next/navigation";

export const handleForm = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if(!title || !content) return; 

    await serverCaller.addBlogPost({ title: title, content: content})
    redirect("/");
}