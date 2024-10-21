import { API } from "../types";

export default async function APIRequest<T>(version:API.Versions, url:string, method:API.Methods, auth:string, body:{[key:string]: any}):Promise<API.Response<T>> {
    try {
        const request = await fetch(`https://api.infinlabs.org/${version}/${url}`, {
            method: method,
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body)
        });
        if (request.ok) {
            const data:T = await request.json();
            return {
                success: true,
                data: data,
            };
        } else {
            const message = await request.json().catch(request.text);
            if (typeof message == "string") {
                return {
                    success: false,
                    error: {
                        message: API.Messages.ServerError,
                        detail: message,
                    },
                };
            } else {
                return {
                    success: false,
                    error: message
                };
            }
        };
    } catch(e:any) {
        console.warn("Error in APIRequest");
        console.warn(e);
        return {
            success: false,
            error: {
                message: API.Messages.InternalError,
                detail: e.toString(),
            },
        };
    }
};