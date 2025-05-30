/// <reference path="../.astro/types.d.ts" />
 
declare namespace App {
    // Note: 'import {} from ""' syntax does not work in .d.ts files.
    interface Locals {
        user: import("better-auth").User | null;
        session: import("better-auth").Session | null;
    }
}

interface ImportMetaEnv {
    readonly DB_URL: string;
    readonly DB_URL2: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}