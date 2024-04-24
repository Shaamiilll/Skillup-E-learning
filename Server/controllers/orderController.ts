import { Request, Response, response } from "express";
import OrderUsecase from "../usecases/orderUsecase";

class OrderController {
  private orderUsecase: OrderUsecase;
  constructor(orderUsecase: OrderUsecase) {
    this.orderUsecase = orderUsecase;
  }

  async createOrder(req: Request, res: Response) {
    try {
        const Response = await this.orderUsecase.createOrder(req.body)
    
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server error",
      });
    }
  }
}

export default OrderController;
