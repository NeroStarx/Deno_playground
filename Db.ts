import { PostgresConnector } from "./Dependencies.ts"



export const client = new PostgresConnector({
    username: "nerostarx",
    database: "deno_pg",
    host: "localhost",
    password: "passcode",
    port: 5432,
    })
