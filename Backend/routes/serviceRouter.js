import express from 'express'
import {getServices} from '../controllers/servicesController.js'
const ServiceRouter = express.Router();

ServiceRouter.route('/').get(getServices)

export default ServiceRouter;