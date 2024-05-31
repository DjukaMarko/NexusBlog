import prisma from "@/lib/prisma";
import { callerFactory, protectedProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { User, currentUser } from "@clerk/nextjs/server";

export const appRouter = router({
    getRandom: protectedProcedure.query(async () => {
        return [10, 20, 30, 40];
    }),
    getBlogPosts: publicProcedure.query(async () => {
        return await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }),
    addBlogPost: protectedProcedure.input(
        z.object({
            title: z.string(),
            content: z.string(),
        })
    ).mutation(async (opts) => {
        const { input } = opts;
        const user = await currentUser();
        return await prisma.post.create({
            data: {
                title: input.title,
                content: input.content,
                authorId: user!.id
            },
        });
    })
});
export const serverCaller = callerFactory(appRouter)({});
export type AppRouter = typeof appRouter;