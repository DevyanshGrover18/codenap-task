import express from 'express'
import {addService, deleteService, getServices, updateService} from '../controllers/servicesController.js'
import {verifyJWT} from '../middleware/verifyJWT.js'
const ServiceRouter = express.Router();

ServiceRouter.route('/').get(getServices).post(verifyJWT, addService)
ServiceRouter.route('/:id').put(verifyJWT, updateService).delete(verifyJWT, deleteService)

export default ServiceRouter;