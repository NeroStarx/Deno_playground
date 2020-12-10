import { Client } from "./Dependencies.ts"



export const client = new Client({
    user: "postgres",
    database: "deno",
    hostname: "localhost",
    password: "",
    port: 54595,
    })