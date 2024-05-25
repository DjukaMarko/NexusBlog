import { currentUser } from "@clerk/nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";
const t = initTRPC.create();


export const router = t.router;
export const publicProcedure = t.procedure;
export const callerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
  const user = await currentUser();
    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
   
    return opts.next({
      ctx: {
        user: user,
      },
    });
  });