import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from 'next-auth';


export async function POST(request: Request){
    await dbConnect()

    const session= await getServerSession(authOptions)
    const user: User = session?.user

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not authenticated"
        },{
            status:401
        })
    }

    const userId = user._id;
    const {acceptMessages} = await request.json()
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            {new: true}
        )

        if(!updatedUser)
            return Response.json({
                success:false,
                message:"failed to update user status"
            },{
                status:401
            })
        else{
            return Response.json({
                success:true,
                message:"User status updated successfully"
            },{
                status:201
            })
            }
    } catch (error) {
        console.log("failed to update user status", error);
        return Response.json({
            success:false,
            message:"failed to update user status"
        },{
            status:501
        })
    }


} 

export async function GET(request: Request){
    await dbConnect()

    const session= await getServerSession(authOptions)
    const user: User = session?.user

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not authenticated"
        },{
            status:401
        })
    }

    const userId = user._id;
   
   try {
     const userFound = await UserModel.findById(userId)
     if(!userFound
     )
         return Response.json({
             success:false,
             message:"User not found"
         },{
             status:401
         })
     else{
         return Response.json({
             success:true,
             isAcceptingMessges: userFound.isAcceptingMessage
         },{
             status:401
         })
     }    
   } catch (error) {
    console.log("user not found", error);
    return Response.json({
        success:false,
        message:"error is getting message accepting status"
    },{
        status:501
    })
   }
}