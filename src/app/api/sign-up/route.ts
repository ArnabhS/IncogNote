import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()

    try {
     const { username, email, password} =  await request.json()
        const existingUserVerifiedByUSername = await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserVerifiedByUSername){
            return Response.json({
                success: false,
                message:"Username already registered"
            }, { status: 400})
        }
       const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode= Math.floor(100000+ Math.random() * 900000).toString()

       if(existingUserByEmail){
        if(existingUserByEmail.isVerified){
            return Response.json({
                success: false,
                message: "User already exists with this email"
            }, {status:400} )
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10);
            existingUserByEmail.password = hashedPassword;
            existingUserByEmail.verifyCode=verifyCode;
            existingUserByEmail.verifyCodeExpiry= new Date(Date.now()+3600000);
            await existingUserByEmail.save();

        }
       }
       else{
        const hashedPassword = await bcrypt.hash(password,10);
        const expiryDate= new Date();
        expiryDate.setHours(expiryDate.getHours()+1 )

       const newUser = new UserModel({
            username,
            email,
            password:hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            messages: []
        })

        await newUser.save()
        //send Verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        console.log(emailResponse)
        
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status:500} )
        }

        return Response.json({
            success:true,
            message: "User registered successfully"
        },{status:201})

       }

    } catch (error) {
        console.error('error registering user', error)
        return Response.json({
            success:false,
            message: "error registering user"
        },
        {
            status:500
        }
    )
    }
}