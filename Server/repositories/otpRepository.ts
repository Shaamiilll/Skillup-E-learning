import { IOTP } from "../interfaces/otp";
import OTP from "../models/otpModel";

class OtpRepository {
  async storeOtp(details: IOTP) {
    try {
        const otpDetails = await OTP.create(details)
        if(!otpDetails){
            return{
                success:false,
                message:"OTP not stored"
            }
        }else{
            return{
                success:true,
                message:"OTP stored"
            }
        }
    } catch (error:any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  async deleteOtp(email:string){
    try {
        await OTP.deleteMany({email:email})
        return{
            success:true,
            message:"Removed all existing otp of given email"
        }
    } catch (error:any) {
        return {
            success: false,
            message: error.message,
          };
    }
  }
}

export default OtpRepository