import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient("mongodb+srv://better-auth-test-user:HppCRY6EA1ODJXG0@cluster0.mafbh.mongodb.net/better-auth?retryWrites=true&w=majority&appName=Cluster0");
const db = client.db()
 
export const auth = betterAuth({
    database: mongodbAdapter(db),

    emailAndPassword: { 
        enabled: true
    },
})