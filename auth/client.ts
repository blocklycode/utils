import { createAuthClient } from "better-auth/react"

export const client = (baseUrl:string) => {
    return createAuthClient({
        baseURL: baseUrl, // the base url of your auth server
    })
};