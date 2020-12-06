import {Application} from "https://deno.land/x/oak@v6.3.2/mod.ts"
import {router} from "./routes.js"

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())


await app.listen({port : 6000})