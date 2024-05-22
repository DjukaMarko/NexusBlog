import { useUser } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();


export const router = t.router;
export const publicProcedure = t.procedure;
export const callerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
   
    return opts.next({
      ctx: {
        user: user,
      },
    });
  });