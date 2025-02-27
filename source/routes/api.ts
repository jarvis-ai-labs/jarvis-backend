/** 
 * source/routes/api.ts
 * This file defines the API routes for the application.
 */

// Import the express module to create a router
import express from "express";

// Import types from express for type checking
import { Request, Response, NextFunction } from 'express';

// Import the controller that handles the API logic
import controller from "../controllers/api";

// Create a new router instance
const router = express.Router();

// Define a GET route for the airdrop endpoint
// When a GET request is made to '/airdrop', it will be handled by the airdrop function in the controller
router.get('/airdrop', controller.airdrop);

// Add new routes
router.get('/tasks', controller.getTasks);
router.post('/process-task', controller.processTask);

// Export the router to be used in other parts of the application
export = router;
