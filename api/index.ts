import * as types from "../types";
import APIRequest from "./request";

import Users from "./users";
import Projects from "./projects";
import Templates from "./templates";


export class API {
    public users:Users;
    public projects:Projects;
    public templates:Templates;

    constructor(auth:string, version:types.API.Versions) {
        this.users = new Users(auth, version);
        this.projects = new Projects(auth, version);
        this.templates = new Templates(auth, version);
    };
};