import ICourse from "../interfaces/course";
import MyJWTPayLoad from "../interfaces/jwt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import courseRepository from "../repositories/courseRepository";
import dotenv from "dotenv";
dotenv.config();


class courseUsecase {
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }

  private courseRepository: courseRepository;
  private userRepository: UserRepository;
  //   private s3Bucket: S3Bucket;

  constructor(
    courseRepository: courseRepository,
    userRepository: UserRepository
  ) {
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
    // this.s3Bucket = new S3Bucket();
  }

  async createCourse(fields: ICourse, token: string) {
    try {
      const user = this.decodeToken(token);
      fields = { ...fields, instructor: user.id };
      const res = await this.courseRepository.createCourse(fields);
      if (!res.data) {
        return {
          status: 500,
          data: {
            success: res.success,
            message: res.message,
          },
        };
      }
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
        },
      };
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

  async getCourses(query: any) {
    try {
      const { search } = query;
      const res = await this.courseRepository.getCourses(search);

      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          courses: res.courses,
        },
      };
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
  async updateCourse(data: ICourse) {
    try {
      let { _id } = data;

      const res = await this.courseRepository.updateCourse(_id as string, data);
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
        },
      };
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
