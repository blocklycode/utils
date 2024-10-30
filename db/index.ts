import { DB } from "../types";


class Collection<DocType> {
    private api_key: string;
    private api_url: string;
    private data_source: string;
    public database: string;
    public collection: DB.Collection;

    constructor(options:DB.CollectionOptions) {
        this.api_key = options.api_key;
        this.api_url = options.api_url;
        this.data_source = options.data_source;
        this.database = options.database;
        this.collection = options.collection;
    };

    /**
     * Send a request to the MongoDB Data API. This function should not be called directly, instead with the functions exported for each operation.
     * 
     * @param {DB.Action} action - The type of action to perform
     * @param {DBRequestData} data - The data to send with the request
     * @returns A promise that resolves to the response from the MongoDB Data API
     * @throws {Error} - If an error occurs during the request
     */
    private async createRequest(action:DB.Action, data:DB.RequestData):Promise<any> {
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
     * @param {DB.KV} document - A document to insert into the collection
     * @returns A promise that resolves to the `_id` value of the inserted document
     */
    public async createOne(document:DB.KV):Promise<string> {
        const result = await this.createRequest(DB.Action.createOne, {document});
        return result?.data?.insertedId ?? null;
    };
    /**
     * Insert multiple documents into a collection.
     * 
     * @param {DB.KV[]} documents - A list of documents to insert into the collection.
     * @returns A promise that resolves to a list of the `_id` values of the inserted documents.
     */
    public async createMany(documents:DB.KV[]):Promise<string[]> {
        const result = await this.createRequest(DB.Action.createMany, {documents});
        return result?.data?.insertedIds ?? [];
    };
    /**
     * Update a single document in a collection.
     * 
     * @param {DB.KV} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {DB.KV} update - A MongoDB update expression to apply to matching documents. For a list of all update operators that the Data API supports, see [Update Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#update-operators).
     * @param {boolean} [upsert=false] - When true, if the update filter does not match any existing documents, then insert a new document based on the filter and the specified update operation.
     * @returns A promise that resolves to an object containing the number of documents that were matched by the query, the number of documents that were modified by the update operation, and the `_id` of the upserted document, if any.
     */
    public async updateOne(filter:DB.KV, update:DB.KV, upsert?:boolean):Promise<{matchedCount: number, modifiedCount: number, upsertedId?: string}> {
        const result = await this.createRequest(DB.Action.updateOne, {filter, update, upsert});
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
     * @param {DB.KV} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {DB.KV} update - A MongoDB update expression to apply to matching documents. For a list of all update operators that the Data API supports, see [Update Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#update-operators).
     * @param {boolean} [upsert=false] - When true, if the update filter does not match any existing documents, then insert a new document based on the filter and the specified update operation.
     * @returns A promise that resolves to an object containing the number of documents that were matched by the query, the number of documents that were modified by the update operation, and the `_id` of the upserted document, if any.
     */
    public async updateMany(filter:DB.KV, update:DB.KV, upsert?:boolean):Promise<{matchedCount: number, modifiedCount: number, upsertedId?: string}> {
        const result = await this.createRequest(DB.Action.updateMany, {filter, update, upsert});
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
     * @param {DB.KV} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {DB.KV} replacement - Replacement data or smth idrk cuase it wasnt in the docs :skull:
     * @returns A promise that resolves to the first document that matches the query, or null if no documents match the query.
     */
    public async replaceOne(filter:DB.KV, replacement:DB.KV):Promise<DocType> {
        const result = await this.createRequest(DB.Action.replaceOne, {filter, replacement});
        return result?.data?.document ?? null;
    };
    /**
     * Delete a single document that matches a query.
     * 
     * @param {DB.KV} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @returns A promise that resolves to the number of documents that were deleted.
     */
    public async deleteOne(filter:DB.KV):Promise<number> {
        const result = await this.createRequest(DB.Action.deleteOne, {filter});
        return result?.data?.deletedCount ?? null;
    };
    /**
     * Delete multiple documents that match a query.
     * 
     * @param {DB.KV} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @returns A promise that resolves to the number of documents that were deleted.
     */
    public async deleteMany(filter:DB.KV):Promise<number> {
        const result = await this.createRequest(DB.Action.deleteMany, {filter});
        return result?.data?.deletedCount ?? 0;
    };
    /**
     * Find a single document that matches a query.
     * 
     * @param {DB.KV} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {DB.PKV} [projection] - A [MongoDB projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/) for matched documents returned by the operation.
     * @returns A promise that resolves to the first document that matches the query, or null if no documents match the query.
    */
    public async findOne(filter:DB.KV, projection?:DB.PKV):Promise<DocType> {
        const result = await this.createRequest(DB.Action.findOne, {filter, projection});
        return result?.data?.document ?? null;
    };
    /**
     * Find multiple documents that match a query.
     * 
     * @param {DB.KV} filter - A MongoDB query filter that matches documents. For a list of all query operators that the Data API supports, see [Query Operators](https://www.mongodb.com/docs/atlas/app-services/mongodb/crud-and-aggregation-apis/#query-operators).
     * @param {DB.PKV} [projection] - A [MongoDB projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/) for matched documents returned by the operation.
     * @param {DB.KV} [sort] - A [MongoDB sort expression](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/) that indicates sorted field names and directions.
     * @param {number} [limit] - The maximum number of matching documents to include the in the response.
     * @param {number} [skip] - The number of matching documents to omit from the response.
     * @returns A promise that resolves to an array of documents that match the query.
     */
    public async findMany(filter:DB.KV, projection?:DB.PKV, sort?:DB.KV, limit?:number, skip?:number):Promise<DocType[]> {
        const result = await this.createRequest(DB.Action.findMany, {filter, projection, sort, limit, skip});
        return result?.data?.documents ?? [];
    };
    /**
     * Run an aggregation pipeline.
     * 
     * @param {DB.KV[]} pipeline - An array of aggregation stages.
     * @returns A promise that resolves to an array that contains the result set of the aggregation.
     */
    public async aggregate(pipeline:DB.KV[]):Promise<DB.KV[]> {
        const result = await this.createRequest(DB.Action.aggregate, {pipeline});
        return result?.data?.documents ?? [];
    };
};

const collection_names = Object.keys(DB.Collection) as (keyof typeof DB.Collection)[];

const collections = Object.fromEntries(
    collection_names.map((name) => [
        name,
        /* @ts-ignore */
        new Collection<DB.CollectionType<typeof DB.Collection[name]>>({
            api_key: process.env.DB_KEY!,
            api_url: process.env.DB_URL!,
            data_source: process.env.DB_SOURCE!,
            database: process.env.DB_NAME!,
            collection: DB.Collection[name],
        }),
    ])
) as {
    [K in keyof typeof DB.Collection]: Collection<DB.CollectionType<(typeof DB.Collection)[K]>>
};

export default collections;