import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";

const createServer = (): { app: Express, server: http.Server } => {
  const app = express();
  const server = http.createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cors());

 
  return { app, server };
};

export default createServer;
