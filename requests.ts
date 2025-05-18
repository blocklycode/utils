export enum Method {
    CREATE = "put",
    RETRIEVE = "get",
    LIST = "get",
    UPDATE = "patch",

    GET = "get",
    POST = "post",
    PATCH = "patch",
    PUT = "put",
    DELETE = "delete"
}

type APIOptions = {
    token?: string;
    version?: string;
}

type APIBaseResponse<T> = {
    code: number;
    data: T;
    message: string;
}
type APISuccessResponse<T> = APIBaseResponse<T> & {
    code: 0;
}
type APIErrorResponse<T> = APIBaseResponse<T> & {
    error?: string;
}
type APIFieldResponse<T> = APIErrorResponse<T> & {
    code: 9 | 10;
    field: string;
}

type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse<T> | APIFieldResponse<T>;


/**
 * Sends a request to the API
 * https://api.infinlabs.org/v1/${path}
 */
export async function send<T>(path: string, method: Method, body?: any, options?: APIOptions):Promise<APIResponse<T>> {
    let token;
    for (let x of document.cookie.split(';')) {
        if (x.includes('token_active=')) {
            token = x.split('=')[1];
            break;
        }
    }
    try {
        let request = await fetch(`https://api.infinlabs.org/${options?.version ?? "v1"}/${path}`, {
            method: method,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Allow': 'application/json',
                'Authorization': options?.token ?? token ?? "",
            },
            body: JSON.stringify(body)
        });
        let data;
        if (request.ok) {
            data = await request.json();
        } else {
            data = await request.text();
        }
        return data
    } catch (e) {
        return {code: -1, message: "request failed", data: e as T}
    }
}