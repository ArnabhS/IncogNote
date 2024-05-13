'use client'
import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from 'next/link';
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/router';
import { signUpSchema } from '@/schemas/signUpSchema';
import axios, { AxiosError } from "axios"
import { ApiResponse } from '@/types/ApiResponse';

const page = () => {

  const [username, setUsername]= useState('');
  const [usernameMessage, setUsernameMessage]= useState('');
  const [isCheckingUsername, setIsCheckingUsername]=useState(false);
  const [isSubmitting, setIsSubmitting]= useState(false)
  const debouncedUsername = useDebounceValue(username,300)
  const { toast } = useToast()
  const router= useRouter();

  //zod implementation  
    const form =useForm({
      resolver: zodResolver(signUpSchema),
      defaultValues:{
        username:'',
        email:'',
        password:''
      }
    })

      useEffect(()=>{
        const checkUserNameUnique= async()=>{
          if(debouncedUsername){
            setIsCheckingUsername(true);
            setUsernameMessage('')
            try {
             const response = await axios.get(`/api/check-username-unique?=${debouncedUsername}`)
              setUsernameMessage(response.data.message)

            } catch (error) {
              const axiosError= error as AxiosError<ApiResponse>;
              console.log(axiosError)
              setUsernameMessage(
                axiosError.response?.data.message ?? "error checking username"
              )
            }
            finally{
              setIsCheckingUsername(false)
            }
          }
        }
        checkUserNameUnique()
      },[debouncedUsername])

      const onSubmit = async (data: z.infer<typeof signUpSchema>)=>{
        setIsSubmitting(true)
        console.log(data)
        try {

         const response = await axios.post<ApiResponse>('/api/sign-up',data)
          toast({
            title:'Success',
            description: response.data.message
          })
          router.replace(`/verify/${username}`)
          
        } catch (error) {
          console.error("error in sign up of user", error);
          const axiosError= error as AxiosError<ApiResponse>;
              console.log(axiosError)
              let errorMessage = axiosError.response?.data.message;
              toast({
                title:'Failed',
                description: errorMessage
              })
        }
        finally{
          setIsSubmitting(false)
        }
      }

  return (
   <div className='flex justify-center items-center min-h-screen bg-gray-800'>
    
   </div>
  )
}

export default page