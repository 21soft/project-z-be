import { body } from "express-validator";

export const registerValidator = [
    body('email', 'Email must not empty').notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must not empty').notEmpty(),
    body('password', 'Minimum length is 8 character').isLength({min: 8})
]