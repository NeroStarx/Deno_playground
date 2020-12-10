import { Router } from "./Dependencies.ts"
import { authController } from "./Controllers/AuthController.ts"

const router = new Router()

router.post("/api/register_user", authController.register)

export default router