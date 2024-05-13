import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request:Request) {
    await dbConnect();

   const {username, content} = await request.json();
   try {
      const user = await UserModel.findOne({username});
      
   } catch (error) {
    
   }
}