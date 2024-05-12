import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request) {

    await dbConnect()
    try {

        const {username, code} = await request.json()
        
        const decodedUsername = decodeURIComponent(username)
       const user = await UserModel.findOne({username: decodedUsername})

       if(!user)
        {
          return Response.json({
              success:false,
              message:"User not found"
          },{
              status:500
          })
        }

        const isCodeValid= user.verifyCode === code;
        const isCodeNotExpiered= new Date(user.verifyCodeExpiry)> new Date()

        if(isCodeNotExpiered&&isCodeValid){
            user.isVerified= true
            await user.save()
            return Response.json({
                success:true,
                message:"Account verified successfully"
            },{
                status:200
            })
        }
        else if(!isCodeNotExpiered){
            return Response.json({
                success:false,
                message:"Verification code expired"
            },{
                status:400
            })
        }
        else{
            return Response.json({
                success:false,
                message:"Incorrect Verification code"
            },{
                status:400
            })
        }



    } catch (error) {
        console.error("Error verifiying user", error);
        return Response.json({
            success: false,
            message: "Error verifiying user ",
            
        },{status:500})
    }
}