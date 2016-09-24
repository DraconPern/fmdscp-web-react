import { Router } from 'express';
import * as DestinationController from './fetch';
const router = new Router();

// Get all Destinations
router.route('/destinations').get(DestinationController.getDestinations);

// Get one destination by id
router.route('/destinations/:id').get(DestinationController.getDestination);

// Add a new Destination
router.route('/destinations').post(DestinationController.addDestination);

// Update a Destination
router.route('/destinations/:id').post(DestinationController.updateDestination);

// Delete a destination by id
router.route('/destinations/:id').delete(DestinationController.deleteDestination);

export default router;
