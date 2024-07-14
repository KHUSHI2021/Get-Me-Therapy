'use client'

import { useToast } from '@/components/ui/use-toast'
import { signUpSchema } from '@/schemas/signUpSchema'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams,useRouter } from 'next/navigation'
import { title } from 'process'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Message } from '../../../model/User';
import { FormField, FormItem, FormLabel, FormMessage, FormControl, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const VerifyAccount=()=> {
  const router = useRouter()
  const params =useParams<{username:string}>()
  const {toast}=useToast()

  const form = useForm<z.infer<typeof verifySchema>>({ //<its is completey optional for use by using this it sure 100% that the value inside it follow the signUpschema pattern also it is typescript feature>
    resolver:zodResolver(verifySchema),
  
  })

  const onSubmit = async(data:z.infer<typeof verifySchema>) => {

    try{
    const response = await axios.post('/api/verify-code',{
       username:params.username,
        code:data.code
    })

    toast({
        title:"Sucess",
        description: response.data.message
    })

    router.replace('sign-in')

    }
    catch(error){
        console.error('Error during sign-up:', error);

    const axiosError = error as AxiosError<ApiResponse>;
    
    toast({
      title: 'Sign Up Failed',
      description: axiosError.response?.data.message,
      variant: 'destructive',
    });

    }
}


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">...
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Verify Your Account
        </h1>
        <p className="mb-4">Enter the verification code sent to your email</p>
      </div>
      <Form {...form}>
        <form onSubmit= {form.handleSubmit(onSubmit)} 
        className="space-y-6">
          <FormField
            name = "code"  // from verifyschema 
          control={form.control}
            
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                <Input placeholder = "shadcn" 
                {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit">Verify</Button>
        </form>
      </Form>
    </div>
  </div>
  )
}

export default VerifyAccount
