import * as types from "../types";

export enum DBActionType {
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

type KeyValue = {
    [key: string]: any;
}
type ProjectionKV = {
    [key: string]: number;
}

type DBRequestData = {
    /* findOne, findMany, updateOne, updateMany, replaceOne, deleteOne, deleteMany */
    filter?: KeyValue;
    /* findOne, findMany */
    projection?: ProjectionKV;
    /* findMany */
    sort?: KeyValue;
    /* findMany */
    limit?: number;
    /* findMany */
    skip?: number;
    /* createOne */
    document?: KeyValue;
    /* createMany */
    documents?: KeyValue[];
    /* updateOne, updateMany */
    update?: KeyValue;
    /* updateOne, updateMany */
    upsert?: boolean;
    /* replaceOne */
    replacement?: KeyValue;
    /* aggregate */
    pipeline?: KeyValue[];
}

enum DBCollection {
    announcements = "announcements",
    appeals = "appeals",
    applications = "applications",
    audit_log = "moderations",
    blocklets = "blocklets",
    bug_reports = "bugs",
    documentation = "documentations",
    experiments = "experiments",
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

type CollectionType<T> =
    T extends DBCollection.announcements ? types.announcements.Announcement :
    T extends DBCollection.appeals ? types.appeals.Appeal :
    T extends DBCollection.applications ? types.applications.Application :
    T extends DBCollection.audit_log ? types.audit_log.Action :
    T extends DBCollection.blocklets ? types.blocklets.Blocklet :
    T extends DBCollection.bug_reports ? types.bug_reports.Report :
    T extends DBCollection.documentation ? types.documentation.Page :
    T extends DBCollection.experiments ? types.experiments.Experiment :
    T extends DBCollection.feedback ? types.feedback.Post :
    T extends DBCollection.lessons ? types.lessons.Lesson :
    T extends DBCollection.positions ? types.positions.Position :
    T extends DBCollection.projects ? types.projects.Project :
    T extends DBCollection.support_articles ? types.support.Article :
    T extends DBCollection.support_posts ? types.support.Post :
    T extends DBCollection.support_tickets ? types.support.Ticket :
    T extends DBCollection.teams ? types.teams.Team :
    T extends DBCollection.templates ? types.templates.Template :
    T extends DBCollection.users ? types.users.User :
    never;

type CollectionType2 = {
    announcements: types.announcements.Announcement;
    appeals: types.appeals.Appeal;
    applications: types.applications.Application;
    audit_log: types.audit_log.Action;
    blocklets: types.blocklets.Blocklet;
    bug_reports: types.bug_reports.Report;
    documentation: types.documentation.Page;
    experiments: types.experiments.Experiment;
    feedback: types.feedback.Post;
    lessons: types.lessons.Lesson;
    positions: types.positions.Position;
    projects: types.projects.Project;
    support_articles: types.support.Article;
    support_posts: types.support.Post;
    support_tickets: types.support.Ticket;
    teams: types.teams.Team;
    templates: types.templates.Template;
    users: types.users.User;
}

export type CollectionOptions = {
    api_key: string;
    api_url: string;
    data_source: string;
    database: string;
    collection: DBCollection;
}

class Collection<DocType> {
    private api_key: string;
    private api_url: string;
    private data_source: string;
    public database: string;
    public collection: DBCollection;

    constructor(options:CollectionOptions) {
        this.api_key = options.api_key;
        this.api_url = options.api_url;
        this.data_source = options.data_source;
        this.database = options.database;
        this.collection = options.collection;
    };

    /**
     * Send a request to the MongoDB Data API. This function should not be called directly, instead with the functions exported for each operation.
     * 
     * @param {DBActionType} action - The type of action to perform
     * @param {DBRequestData} data - The data to send with the request
     * @returns A promise that resolves to the response from the MongoDB Data API
     * @throws {Error} - If an error occurs during the request
     */
    private async createRequest(action:DBActionType, data:DBRequestData):Promise<any> {
        const request = await fetch(`${this.api_url}/action/${action}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "api-key": this.api_key
            },
            body: JSON.stringify({
                "collection": this.collection,
                "database": this.database,
                "dataSource": this.data_source,
                ...data
            })
        });
        const body = await request.json();
        if (request.status === 200) {
            return {
                success: true,
                data: body
            }
        } else {
            throw new Error(`DatabaseError: ${body.error_code} (${body.error_message})`)
        };
    };

    /**
     * Insert a single document into a collection.
     * 
     * @param {KeyValue} document - A document to insert into the collection
     * @returns A promise that resolves to the `_id` value of the inserted document
     */
    public async createOne(document:KeyValue):Promise<string> {
        const result = await this.createRequest(DBActionType.createOne, {document});
        return result?.data?.insertedId ?? null;
    };
    /**
     * Insert multiple documents into a collection.
     * 
     * @param {KeyValue[]} documents - A list of documents to insert into the collection.
     * @returns A promise that resolves to a list of the `_id` values of the inserted documents.
     */
    public async createMany(documents:KeyValue[]):Promise<string[]> {
        const result = await this.createRequest(DBActionType.createMany, {documents});
        return result?.data?.insertedIds ?? [];
    };
    /**
     * Update a single document in a collection.
     * 
     * @param {KeyValue} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {KeyValue} update - A MongoDB update expression to apply to matching documents. For a list of all update operators that the Data API supports, see [Update Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#update-operators).
     * @param {boolean} [upsert=false] - When true, if the update filter does not match any existing documents, then insert a new document based on the filter and the specified update operation.
     * @returns A promise that resolves to an object containing the number of documents that were matched by the query, the number of documents that were modified by the update operation, and the `_id` of the upserted document, if any.
     */
    public async updateOne(filter:KeyValue, update:KeyValue, upsert?:boolean):Promise<{matchedCount: number, modifiedCount: number, upsertedId?: string}> {
        const result = await this.createRequest(DBActionType.updateOne, {filter, update, upsert});
        return result?.data ? {
            matchedCount: result.data.matchedCount,
            modifiedCount: result.data.modifiedCount,
            upsertedId: result.data.upsertedId,
        } : {
            matchedCount: 0,
            modifiedCount: 0,
        };
    };
    /**
     * Update multiple documents in a collection.
     * 
     * @param {KeyValue} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {KeyValue} update - A MongoDB update expression to apply to matching documents. For a list of all update operators that the Data API supports, see [Update Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#update-operators).
     * @param {boolean} [upsert=false] - When true, if the update filter does not match any existing documents, then insert a new document based on the filter and the specified update operation.
     * @returns A promise that resolves to an object containing the number of documents that were matched by the query, the number of documents that were modified by the update operation, and the `_id` of the upserted document, if any.
     */
    public async updateMany(filter:KeyValue, update:KeyValue, upsert?:boolean):Promise<{matchedCount: number, modifiedCount: number, upsertedId?: string}> {
        const result = await this.createRequest(DBActionType.updateMany, {filter, update, upsert});
        return result?.data ? {
            matchedCount: result.data.matchedCount,
            modifiedCount: result.data.modifiedCount,
            upsertedId: result.data.upsertedId,
        } : {
            matchedCount: 0,
            modifiedCount: 0,
        };
    };
    /**
     * Replace a single document that matches a query.
     * 
     * @param {KeyValue} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {KeyValue} replacement - Replacement data or smth idrk cuase it wasnt in the docs :skull:
     * @returns A promise that resolves to the first document that matches the query, or null if no documents match the query.
     */
    public async replaceOne(filter:KeyValue, replacement:KeyValue):Promise<DocType> {
        const result = await this.createRequest(DBActionType.replaceOne, {filter, replacement});
        return result?.data?.document ?? null;
    };
    /**
     * Delete a single document that matches a query.
     * 
     * @param {KeyValue} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @returns A promise that resolves to the number of documents that were deleted.
     */
    public async deleteOne(filter:KeyValue):Promise<number> {
        const result = await this.createRequest(DBActionType.deleteOne, {filter});
        return result?.data?.deletedCount ?? null;
    };
    /**
     * Delete multiple documents that match a query.
     * 
     * @param {KeyValue} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @returns A promise that resolves to the number of documents that were deleted.
     */
    public async deleteMany(filter:KeyValue):Promise<number> {
        const result = await this.createRequest(DBActionType.deleteMany, {filter});
        return result?.data?.deletedCount ?? 0;
    };
    /**
     * Find a single document that matches a query.
     * 
     * @param {KeyValue} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {ProjectionKV} [projection] - A [MongoDB projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/) for matched documents returned by the operation.
     * @returns A promise that resolves to the first document that matches the query, or null if no documents match the query.
    */
    public async findOne(filter:KeyValue, projection?:ProjectionKV):Promise<DocType> {
        const result = await this.createRequest(DBActionType.findOne, {filter, projection});
        return result?.data?.document ?? null;
    };
    /**
     * Find multiple documents that match a query.
     * 
     * @param {KeyValue} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {ProjectionKV} [projection] - A [MongoDB projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/) for matched documents returned by the operation.
     * @param {KeyValue} [sort] - A [MongoDB sort expression](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/) that indicates sorted field names and directions.
     * @param {number} [limit] - The maximum number of matching documents to include the in the response.
     * @param {number} [skip] - The number of matching documents to omit from the response.
     * @returns A promise that resolves to an array of documents that match the query.
     */
    public async findMany(filter:KeyValue, projection?:ProjectionKV, sort?:KeyValue, limit?:number, skip?:number):Promise<DocType[]> {
        const result = await this.createRequest(DBActionType.findMany, {filter, projection, sort, limit, skip});
        return result?.data?.documents ?? [];
    };
    /**
     * Run an aggregation pipeline.
     * 
     * @param {KeyValue[]} pipeline - An array of aggregation stages.
     * @returns A promise that resolves to an array that contains the result set of the aggregation.
     */
    public async aggregate(pipeline:KeyValue[]):Promise<KeyValue[]> {
        const result = await this.createRequest(DBActionType.aggregate, {pipeline});
        return result?.data?.documents ?? [];
    };
};

const collection_names = Object.keys(DBCollection);

const collections = Object.fromEntries(collection_names.map(x => {
    type X = DBCollection[x];
    return [x,
        new Collection<CollectionType<X>>({
            api_key: process.env.DB_KEY!,
            api_url: process.env.DB_URL!,
            data_source: process.env.DB_SOURCE!,
            database: process.env.DB_NAME!,
            /* @ts-ignore */
            collection: DBCollection[x],
        })
    ]
}));

export default collections;