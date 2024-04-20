import ICourse from "../interfaces/course";
import MyJWTPayLoad from "../interfaces/jwt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import courseRepository from "../repositories/courseRepository";

class courseUsecase {
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }

  private courseRepository: courseRepository;
  private userRepository: UserRepository;

  constructor(
    courseRepository: courseRepository,
    userRepository: UserRepository
  ) {
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
  }

  async createCourse(fields: ICourse, token: string) {
    try {
      if (
        !fields.title ||
        !fields.description ||
        !fields.category ||
        !fields.level ||
        !fields.language ||
        !fields.price
      ) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Provide necessary fields",
          },
        };
      }
      const user = this.decodeToken(token)
      fields={...fields,instructor:user.id}
      console.log(fields);
      
      
      
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
}

export default courseUsecase;
