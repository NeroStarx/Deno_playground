import { Application } from "./Dependencies.ts"
import router from "./Routes.ts"

const port = 9001 || Deno.env.get("PORT")

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log('server is up and running')

await app.listen({port : +port })