import axios from "axios";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import dotenv from "dotenv";
import { HttpStatus } from "../enums/httpStatusEnum";
import bcrypt from "bcrypt";
import MyJWTPayLoad from "../interfaces/jwt";
import { IncomingHttpHeaders } from "http";
import { UserRole } from "../enums/userRoleEnum";

class userUsecase {
  private userRepository: UserRepository;
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(body: any) {
    try {
      const { email, name, password, confirmPassword } = body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwodRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      if (!emailRegex.test(email)) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "Enter a valid email",
          },
        };
      }

      if (password != confirmPassword) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "Password is not match",
          },
        };
      }

      const emailExist = await this.userRepository.authenticateUser(email);
      if (emailExist.data) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "user already logged in",
          },
        };
      }

      const hashedPassword = await bcrypt.hash(password as string, 10);
      const result = await this.userRepository.createUser({
        email,
        name,
        password: hashedPassword,
      });
      if (!result.data) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: result.message,
          },
        };
      }
      const token = jwt.sign(result.data, "itssecret");
      
      return {
        status: result.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: true,
          message: result.message,
          token: token,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "Interal Server error",
        },
      };
    }
  }

  async findUser(header: IncomingHttpHeaders) {
    try {
        const token = header['authorization']
        
        if(!token){
            return {
                status: HttpStatus.ServerError,
                data: {
                  success: false,
                  message: "server error",
                },
              };
        }
       
        const decode = this.decodeToken(token)
      
        
        const response = await this.userRepository.findUser(decode.id)
      
        if(!response.data){
            return{
                status:response.success?HttpStatus.Success:HttpStatus.ServerError,
                data:{
                    success: response.success,
                    message: response.message,
                }
            }
        }
        return{
            status:response.success?HttpStatus.Success:HttpStatus.ServerError,
            data:{
                success:response.success,
                message:response.message,
                user:response.data
            }
        }

    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }

  async loginUser(body:any){
    try {
      const {email , password } = body
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        return {
          status: HttpStatus.NotFound,
          data: {
            success: false,
            message: "Invalid email or password format",
          },
        };
      }
      const response = await this.userRepository.authenticateUser(email);
      if (!response.data) {
        return {
          status: HttpStatus.NotFound,
          data: {
            success: false,
            message: response.message,
          },
        };
      }

      
      if (response.data.isBlock) {
        return {
          status: HttpStatus.NotFound,
          data: {
            success: false,
            message: "User is blocked by Admin",
          },
        };
      }
      const comparedPassword = await bcrypt.compare(password , response.data.password)
      if(!comparedPassword){
        return{
          status:HttpStatus.NotFound,
          data:{
            success:false,
            message:"Password is not match"
          }
        }
      }

      const token = jwt.sign({id:response.data.id , email:response.data.email , role:response.data.role } , "itssecret")
      return {
        status: response.success
          ? HttpStatus.Success
          : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: "User Authenticated",
          token: token,
          admin: response.data.role == UserRole.Admin,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
}

export default userUsecase;
