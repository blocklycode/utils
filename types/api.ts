//Types: API

export enum Messages {
    MissingParams = "Missing required parameters",  //400
    InvalidParams = "Invalid parameters",           //400
    MissingAuth = "Missing authentication",         //401
    InvalidAuth = "Invalid authentication",         //401
    InternalError = "Internal error",               //n/a
    NotFound = "Not found",                         //404
    Forbidden = "Forbidden",                        //403
    RateLimit = "Rate limit exceeded",              //429
    BadRequest = "Bad request",                     //400
    AlreadyExists = "Already exists",               //409
    NotImplemented = "Not implemented",             //501
    UnprocessableEntity = "Unprocessable entity",   //422
    TooManyRequests = "Too many requests",          //429
    ServerError = "Server error",                   //500
};

export enum Methods {
    GET = "GET",                                    //Retrieve / fetch / list
    POST = "POST",                                  //Create / add / insert
    PUT = "PUT",                                    //Update / edit
    DELETE = "DELETE",                              //Delete / remove
}
export enum Versions {
    v3 = "v3",                                      //Current
    v4 = "beta",                                    //Next Release
}

export type Response<T> = SucessResponse<T> | ErrorResponse;

export interface SucessResponse<T> {
    success: true;
    data: T;
};

export interface ErrorResponse {
    success: false;
    error: {
        message: Messages;
        detail: string;
    };
};

