import axios from "axios"
import jwt from "jsonwebtoken"
import UserRepository from "../repositories/UserRepository"
import dotenv from "dotenv"
import { HttpStatus } from "../enums/httpStatusEnum"
import bcrypt from 'bcrypt'
import MyJWTPayLoad from "../interfaces/jwt"

class userUsecase{
    private userRepository:UserRepository
    private decodeToken(token:string):MyJWTPayLoad{
        return jwt.verify(token , 'itssecret') as MyJWTPayLoad
    }
    constructor(userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async createUser(body:any){
        try {
            const {email , name , password , confirmPassword } = body
            const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwodRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

            if(!emailRegex.test(email)){
                return{
                    status:HttpStatus.ServerError,
                    data:{
                        success:false,
                        message:"Enter a valid email"
                    }
                }
            }

            if(password != confirmPassword){
                return{
                    status:HttpStatus.ServerError,
                    data:{
                        success:false,
                        message:"Password is not match"
                    }
                }
            }
            
            const emailExist = await this.userRepository.authenticateUser(email)
            if(emailExist.data){
                return{
                    status:HttpStatus.ServerError,
                    data:{
                        success:false,
                        message:"user already logged in"
                    }
                }
            }
            
            const hashedPassword = await bcrypt.hash(password as string , 10)
            const result = await this.userRepository.createUser({email, name , password:hashedPassword})
            if(!result.data){
                return{
                    status:HttpStatus.ServerError,
                    data:{
                        success:false,
                        message:result.message
                    }
                }
            }
            const token = jwt.sign(result.data , "itssecret")

            return{
                status:result.success?HttpStatus.Success:HttpStatus.ServerError,
                data:{
                    success:true,
                    message:result.message,
                    token:token
                }
            }
        } catch (error) {
            return{
                status:HttpStatus.ServerError,
                data:{
                    success:false,
                    message:"Interal Server error"
                }
            }
        }
    }
}   

export default userUsecase