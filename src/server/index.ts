import prisma from "@/lib/prisma";
import { callerFactory, protectedProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
    getRandom: publicProcedure.query(async () => {
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
            authorId: z.number(),
        })
    ).mutation(async (opts) => {
        const { input } = opts;
        return await prisma.post.create({
            data: {
                title: input.title,
                content: input.content,
                authorId: input.authorId
            },
        });
    })
});
export const serverCaller = callerFactory(appRouter)({});
export type AppRouter = typeof appRouter;