/** source/server.ts */
// Import necessary modules
import express, { Express } from "express";
import morgan from "morgan";
import { Server, Socket } from 'socket.io';
import http from "http";
import si from 'systeminformation';
import os from 'os';

// Import API routes
import api from "./routes/api";
// Create an Express application
const router: Express = express();

/** Logging */
// Use Morgan middleware for HTTP request logging
router.use(morgan("combined"));

/** Parse the request */
// Parse URL-encoded bodies
router.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
// Parse JSON bodies
router.use(express.json());

/** RULES OF OUR API */
// Middleware to handle CORS and set appropriate headers
router.use((req, res, next) => {
  // Set the CORS policy to allow all origins
  res.header("Access-Control-Allow-Origin", "*");
  // Set the allowed headers for CORS
  res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PATCH, DELETE, POST");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
// Use the imported API routes
router.use("/", api);

/** Error handling */
// Middleware to handle 404 errors
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

// Create an HTTP server using the Express app
const httpServer = http.createServer(router);

// Set the port for the server to listen on
const PORT: any = process.env.PORT ?? 4003;

// Start the server
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
