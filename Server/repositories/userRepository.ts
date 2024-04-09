import jwt from "jsonwebtoken";
import { UserRole } from "../enums/userRoleEnum";
import IUserBody from "../interfaces/userBody";
import Users from "../models/userModel";

class UserRepository {
  async getUsers(role: string, regex: string) {
    try {
      const users = regex   ? await Users.find(  { role: role, email: { $regex: regex } },  { password: 0 }  )  : await Users.find({ role: role }, { password: 0 });
      return {
        success: true,
        message: "All users fetched",
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetach ${error}`,
      };
    }
  }
  async authenticateUser(email: string) {
    try {
      const userDeatails = await Users.findOne({ email: email });
      if (!userDeatails) {
        return {
          success: true,
          message: "No user details",
        };
      }
      return {
        success: true,
        message: "user details fetched",
        data: userDeatails,
      };
    } catch (error) {
      return {
        success: false,
        message: `failed to fetch ${error}`,
      };
    }
  }

  async createUser(details: IUserBody) {
    try {
        const userDetails = await Users.create(details);
        if(!userDetails){
            return {
                success: false,
                message: "user details nopt stored",
              };
        }
        
        return {
            success: true,
            message: "Data inserted successfully",
            data: {
              id: userDetails._id,
              email: userDetails.email,
              role: userDetails.role,
            },
          };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async findUser(id:string){
    try {
      const userDetails = await Users.findById(id, { password: 0 });
      if (!userDetails) {
        return {
          success: false,
          message: `User not found`,
        };
      }
      return {
        success: true,
        message: "user details fetched",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async updateUser(id: string, updates: any) {
    try {
      const userDetails = await Users.findByIdAndUpdate(id, updates, {
        new: true,
      });
      console.log(userDetails);
      
      if (!userDetails) {
        return {
          success: false,
          message: "No user found",
        };
      }
      return {
        success: true,
        message: "user details updated",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
  async updateRole(id: string, updates: any) {
    try {
      const userDetails = await Users.findByIdAndUpdate(
        id,
        { verification: updates, role: "instructor" },
        { new: true }
      );
      return {
        success: true,
        message: "user details updated",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
}

export default UserRepository;
