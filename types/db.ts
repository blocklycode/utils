//Types: DB

import * as types from "./";

export enum Action {
    createOne = "insertOne",
    createMany = "insertMany",
    updateOne = "updateOne",
    updateMany = "updateMany",
    replaceOne = "replaceOne",
    deleteOne = "deleteOne",
    deleteMany = "deleteMany",
    findOne = "findOne",
    findMany = "find",
    aggregate = "aggregate",
}
export enum Collection {
    announcements = "announcements",
    appeals = "appeals",
    applications = "applications",
    audit_log = "moderations",
    blocklets = "blocklets",
    bug_reports = "bugs",
    documentation = "documentations",
    feature_flags = "feature_flags",
    feedback = "feedbacks",
    lessons = "lessons",
    positions = "staff_positions",
    projects = "projects",
    support_articles = "support_articles",
    support_posts = "support_posts",
    support_tickets = "support_tickets",
    teams = "teams",
    templates = "templates",
    users = "users",
}

export type KV = {
    [key: string]: any;
}
export type PKV = {
    [key: string]: number;
}

export type RequestData = {
    filter?: KV;                  //findOne, findMany, updateOne, updateMany, replaceOne, deleteOne, deleteMany
    projection?: PKV;          //findOne, findMany
    sort?: KV;                    //findMany
    limit?: number;                     //findMany
    skip?: number;                      //findMany
    document?: KV;                //createOne
    documents?: KV[];             //createMany
    update?: KV;                  //updateOne, updateMany
    upsert?: boolean;                   //updateOne, updateMany
    replacement?: KV;             //replaceOne
    pipeline?: KV[];              //aggregate
}

export type CollectionType<T> =
    T extends Collection.announcements ? types.announcements.Announcement :
    T extends Collection.appeals ? types.appeals.Appeal :
    T extends Collection.applications ? types.applications.Application :
    T extends Collection.audit_log ? types.audit_log.Action :
    T extends Collection.blocklets ? types.blocklets.Blocklet :
    T extends Collection.bug_reports ? types.bug_reports.Report :
    T extends Collection.documentation ? types.documentation.Page :
    T extends Collection.feature_flags ? types.feature_flags.FeatureFlag :
    T extends Collection.feedback ? types.feedback.Post :
    T extends Collection.lessons ? types.lessons.Lesson :
    T extends Collection.positions ? types.positions.Position :
    T extends Collection.projects ? types.projects.Project :
    T extends Collection.support_articles ? types.support.Article :
    T extends Collection.support_posts ? types.support.Post :
    T extends Collection.support_tickets ? types.support.Ticket :
    T extends Collection.teams ? types.teams.Team :
    T extends Collection.templates ? types.templates.Template :
    T extends Collection.users ? types.users.User :
    never;


export type CollectionOptions = {
    api_key: string;
    api_url: string;
    data_source: string;
    database: string;
    collection: Collection;
}