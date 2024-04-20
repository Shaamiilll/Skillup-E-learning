import { Request, Response } from "express";
import courseUsecase from "../usecases/courseUsecase";

class courseController {
  private courseUsecase: courseUsecase;
  constructor(courseUsecase: courseUsecase) {
    this.courseUsecase = courseUsecase;
  }

  async createCourse(req:Request , res:Response){
    try {
        const Response = await this.courseUsecase.createCourse(req.body , req.headers["authorization"] as string);

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"server error"
        })
    }
  }
}

export default courseController;
