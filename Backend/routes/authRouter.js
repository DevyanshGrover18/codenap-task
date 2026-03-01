import express from 'express';
import { getAdmin, login, signup } from '../controllers/authController.js';
const AuthRouter = express.Router();

AuthRouter.get('/admin-data', getAdmin)
AuthRouter.post('/login', login)
AuthRouter.post('/signup', signup)

export default AuthRouter