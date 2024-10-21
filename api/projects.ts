import { projects, API } from "../types";
import APIRequest from "./request";

export default class Projects {
    private auth: string;
    private version: API.Versions;

    constructor(auth:string, version:API.Versions) {
        this.auth = auth;
        this.version = version;
    }

    async retrieve(id:string):Promise<API.Response<projects.Project>> {
        return await APIRequest<projects.Project>(this.version, `projects/${id}`, API.Methods.GET, this.auth, {});
    };
};