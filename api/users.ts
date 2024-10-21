import { users, API } from "../types";
import APIRequest from "./request";

type Create = {
    password: string;
    email: string;
}

export default class Users {
    private auth: string;
    private version: API.Versions;

    constructor(auth:string, version:API.Versions) {
        this.auth = auth;
        this.version = version;
    }

    async retrieve(username:string):Promise<API.Response<users.User>> {
        return await APIRequest<users.User>(this.version, `users/${username}`, API.Methods.GET, this.auth, {});
    };

    async create(username:string, body:Create):Promise<API.Response<users.User>> {
        return await APIRequest<users.User>(this.version, `users/${username}`, API.Methods.POST, this.auth, body);
    };
};