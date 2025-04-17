import { auth } from "./auth";
import type { APIRoute } from "astro";
 
export const handler: APIRoute = async (ctx) => {
	return auth.handler(ctx.request);
};