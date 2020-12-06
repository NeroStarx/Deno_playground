import {Router} from "https://deno.land/x/oak@v6.3.2/mod.ts"
import {CreateFun} from "./contorllers/Methods.ts"

export const router = new Router()

router.post("/api/delete" , CreateFun)