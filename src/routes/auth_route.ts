import { Router } from "express";
import { login, register } from "../controller/auth_controller";
import { registerValidator } from "../validator/auth_validator";

const router = Router()

router.post('/login', login)
router.post('/register', registerValidator, register)
router.get('/profile')

export default router