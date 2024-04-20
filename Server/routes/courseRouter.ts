import express, { NextFunction, Request, Response } from "express";
import AuthMiddleware from "../middlewares/authMiddleware";
import UserRepository from "../repositories/UserRepository";
import CourseController from "../controllers/courseController";
import CourseRepository from "../repositories/courseRepository";
import CourseUsecase from "../usecases/courseUsecase";

const Router = express.Router();

const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const courseRepository = new CourseRepository();

const courseUsecase = new CourseUsecase(
  courseRepository,
    userRepository
  );

  
const courseController = new CourseController(courseUsecase);

Router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => courseController.createCourse(req, res)
);

export default Router;
