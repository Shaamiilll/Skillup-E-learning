import { Request, Response } from "express";
import userUsecase from "../usecases/userUseCase";

class UserController {
  private userUsecase: userUsecase;
    constructor(userUsecase:userUsecase){
        this.userUsecase= userUsecase
    }

    async createUser(req: Request, res: Response) {
      try {
        const response = await this.userUsecase.createUser(req.body);
        res.status(response?.status).send(response?.data);
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Internal Server error",
        });
      }
  }

    async loginUser (req:Request , res:Response){
      try {
        const response = await this.userUsecase.loginUser(req.body)
        res.status(response?.status).send(response?.data);
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Internal Server error",
        });
      }
    }

    async findUser(req:Request , res : Response){
      try {
        const response = await this.userUsecase.findUser(req.headers)
        res.status(response.status).send(response.data)
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Internal Server error",
        });
      }
    }
  
}

export default UserController;
