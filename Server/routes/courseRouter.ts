import express, { NextFunction, Request, Response } from "express";
import AuthMiddleware from "../middlewares/authMiddleware";
import UserRepository from "../repositories/UserRepository";
import CourseController from "../controllers/courseController";
import CourseRepository from "../repositories/courseRepository";
import CourseUsecase from "../usecases/courseUsecase";
import multer from "multer";
const Router = express.Router();

const storage= multer.memoryStorage()
const upload = multer({ storage });
const fields = [
  { name: 'thumbnail', maxCount: 1 },
  { name: 'summaryVideo', maxCount: 1 },
  { name: 'lessons', maxCount: Infinity },
];

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

Router.get("/", (req: Request, res: Response) =>
  courseController.getCourses(req, res)
);

Router.patch(
  "/update",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => courseController.updateCourse(req, res)
);

Router.patch(
  "/review",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => courseController.updateReviews(req, res)
);

export default Router;
