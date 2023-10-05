import { Router } from "express";
import { login, register } from "../controller/auth_controller";
import { loginValidator, registerValidator } from "../validator/auth_validator";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: OK
 *               data:
 *                 id: 12345
 *                 uuid: 6bed2af1-066d-48d1-85fb-326703bed20c
 *                 email: user@example.com
 *                 displayName: user
 *       400:
 *         description: Bad request, validation errors
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad Request
 *               errors:
 *                 - param: email
 *                   msg: Invalid email
 *                 - param: password
 *                   msg: Password too short
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *               errors: Registration failed
 */
router.post("/register", registerValidator, register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: User login with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: OK
 *               data:
 *                 access_token: asdsad
 *                 refresh_token: asdsad
 *                 user:
 *                  id: 12345
 *                  uuid: 6bed2af1-066d-48d1-85fb-326703bed20c
 *                  email: user@example.com
 *                  displayName: user
 *       400:
 *         description: Bad request, validation errors
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad Request
 *               errors:
 *                 - param: email
 *                   msg: Invalid email
 *                 - param: password
 *                   msg: Password too short
 *       404:
 *         description: Not Found, User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not Found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *               errors: Registration failed
 */
router.post("/login", loginValidator, login);
router.get("/profile");

export default router;
