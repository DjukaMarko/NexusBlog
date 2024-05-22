import prisma from "@/lib/prisma";
import { publicProcedure, router } from "./trpc";

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
    })
});

export type AppRouter = typeof appRouter;