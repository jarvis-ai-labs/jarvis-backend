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

// Add new routes
router.get('/tasks', controller.getTasks);
router.post('/process-task', controller.processTask);

// Export the router to be used in other parts of the application
export = router;
