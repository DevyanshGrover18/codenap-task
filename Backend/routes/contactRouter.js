import express from 'express'
import {sendMessage} from '../controllers/contactController.js'
const ContactRouter = express.Router()

ContactRouter.post('/', sendMessage)

export default ContactRouter;