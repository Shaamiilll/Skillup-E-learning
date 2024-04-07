import express, { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/UserRepository";
import UserController from "../controllers/userController";
import UserUseCase from "../usecases/userUseCase";
import OtpRepository from "../repositories/otpRepository";
import AuthMiddleware from "../middlewares/authMiddleware";

const Router = express.Router();

const userRepository = new UserRepository();
const otpRepository= new OtpRepository()
const authMiddleware= new AuthMiddleware(userRepository)
const userUseCase = new UserUseCase(userRepository , otpRepository);
const userController = new UserController(userUseCase);

Router.get("/",(req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.adminCheck(req, res, next),
  (req: Request, res: Response) => userController.getUsers(req, res)
);

Router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    userController.createUser(req, res);
});

Router.post('/otp', (req: Request, res: Response, next: NextFunction) => {
    userController.sendOTP(req, res);
});

Router.post('/otp/verify', (req: Request, res: Response, next: NextFunction) => {
    userController.verifyOTP(req, res);
});

Router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    userController.loginUser(req, res);
});

Router.get('/find', (req: Request, res: Response, next: NextFunction)=>{
    userController.findUser(req,res)
})
export default Router;
