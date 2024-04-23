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
}
