import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(import.meta.env.DB_URL);
const db = client.db()
 
export const auth = betterAuth({
    database: mongodbAdapter(db),

    emailAndPassword: { 
        enabled: true
    },
})