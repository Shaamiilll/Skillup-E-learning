import express, { Request, Response, NextFunction } from "express";
import AuthMiddleware from "../middlewares/authMiddleware";
import UserRepository from "../repositories/UserRepository";
import CourseRepository from "../repositories/courseRepository";
import StripePayments from "../utils/stripePayment";
import OrderController from "../controllers/orderController";
import OrderRepository from "../repositories/orderRepository";
import OrderUsecase from "../usecases/orderUsecase";
const Router = express.Router();

const userRepository = new UserRepository();
const stripePayments = new StripePayments(userRepository);
const authMiddleware = new AuthMiddleware(userRepository);
const courseRepository = new CourseRepository();
const orderRepository = new OrderRepository();
const orderUsecase = new OrderUsecase(
  orderRepository,
  userRepository,
  courseRepository
);
const orderController = new OrderController(orderUsecase);

Router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authUser(req, res, next);
  },
  (req: Request, res: Response) => {
    orderController.createOrder(req, res);
  }
);
Router.post(
  "/checkout-session",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authUser(req, res, next);
  },
  (req: Request, res: Response) => {
    stripePayments.checkoutSession(req, res);
  }
);

export default Router;
