import { auth } from "./auth";
import type { APIContext, MiddlewareNext } from "astro";
 
export const middleware = async (context:APIContext, next:MiddlewareNext) => {
    const isAuthed = await auth.api
        .getSession({
            headers: context.request.headers,
        })
 
    if (isAuthed) {
        context.locals.user = isAuthed.user;
        context.locals.session = isAuthed.session;
    } else {
        context.locals.user = null;
        context.locals.session = null;
    }
 
    return next();
};