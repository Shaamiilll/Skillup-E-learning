import { HttpStatus } from "../enums/httpStatusEnum";
import jwt from "jsonwebtoken";
import MyJWTPayLoad from "../interfaces/jwt";
import CourseRepository from "../repositories/courseRepository";
import OrderRepository from "../repositories/orderRepository";
import UserRepository from "../repositories/UserRepository";

class OrderUsecase {
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;
  private courseRepository: CourseRepository;
  constructor(
    orderRepository: OrderRepository,
    userRepository: UserRepository,
    courseRepository: CourseRepository
  ) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.courseRepository = courseRepository;
  }

  async createOrder(body: any) {
    try {
    
      const response = await this.courseRepository.findCourse(body.courseId);
      if (!response.course) {
        return {
          status: 500,
          data: {
            success: false,
            message: "No Course Found",
          },
        };
      }
      const orderRes = await this.orderRepository.createOrder({
        userId: body.userId,
        courseId: body.courseId,
        price:Math.floor(response.course?.price),
        date: new Date()
      })
      
      

      if (!orderRes.order) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Order not saved",
          },
        };
      }
      return {
        status: 200,
        data: {
          success: true,
          message: "Order Saved",
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "Server error",
        },
      };
    }
  }
}

export default OrderUsecase;
