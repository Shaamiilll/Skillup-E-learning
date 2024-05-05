import { Request, Response , NextFunction } from "express";
import courseUsecase from "../usecases/courseUsecase";

class courseController {
  private courseUsecase: courseUsecase;
  constructor(courseUsecase: courseUsecase) {
    this.courseUsecase = courseUsecase;
  }

  async createCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.createCourse(
        req.body,
        req.headers["authorization"] as string
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getCourses(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getCourses(req.query);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async updateCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.updateCourse(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async updateReviews(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.updateReviews(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

}

export default courseController;
