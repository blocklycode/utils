import { templates, API } from "../types";
import APIRequest from "./request";

export default class Templates {
    private auth: string;
    private version: API.Versions;

    constructor(auth:string, version:API.Versions) {
        this.auth = auth;
        this.version = version;
    }

    async retrieve(id:string):Promise<API.Response<templates.Template>> {
        return await APIRequest<templates.Template>(this.version, `templates/${id}`, API.Methods.GET, this.auth, {});
    };
};