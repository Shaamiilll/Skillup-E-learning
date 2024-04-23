
import express, { Request, Response, NextFunction } from "express";
import AuthMiddleware from "../middlewares/authMiddleware";
import UserRepository from "../repositories/UserRepository";
import CourseRepository from "../repositories/courseRepository";
import StripePayments from "../utils/stripePayment";


const Router = express.Router();


const userRepository = new UserRepository();
const stripePayments = new StripePayments(userRepository);
const authMiddleware = new AuthMiddleware(userRepository);
const courseRepository = new CourseRepository();

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
