import express, { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/UserRepository";
import UserController from "../controllers/userController";
import UserUseCase from "../usecases/userUseCase";

const Router = express.Router();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

Router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    userController.createUser(req, res);
});


Router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    userController.loginUser(req, res);
});

Router.get('/find', (req: Request, res: Response, next: NextFunction)=>{
    userController.findUser(req,res)
})
export default Router;
