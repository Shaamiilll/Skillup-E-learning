import { ObjectId } from "mongoose";

interface ILearning {
  course: ObjectId;
  progress: ObjectId[];
  certificate: boolean;
}

interface IWallet {
  balance: number;
  transactions: {
    date: Date;
    amount: string | number;
    type: string;
    remark: string;
  }[];

}
interface Iuser {
  id: string;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  role?: string;
  isBlock?: boolean;
  verification?: object;
  verified?: boolean;
  learnings: ILearning[];
  wallet:IWallet;
  wishlist:ObjectId[]
}


export default Iuser;
