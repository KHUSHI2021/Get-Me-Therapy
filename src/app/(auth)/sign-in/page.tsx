'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect,useState } from "react"
import { useDebounceValue,useDebounceCallback } from 'usehooks-ts';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { signInSchema } from "@/schemas/signInSchema"
//import messages from '@/messages.json';
import axios,{ AxiosError} from 'axios';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ApiResponse } from "@/types/ApiResponse"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
//import { Checkbox } from '@/components/ui/checkbox';

export default function signUpForm(){

//const page = ()=> {
    
  const {toast}= useToast();
  const router = useRouter();

  //zod implementation

  const form = useForm<z.infer<typeof signInSchema>>({ //<its is completey optional for use by using this it sure 100% that the value inside it follow the signUpschema pattern also it is typescript feature>
    resolver:zodResolver(signInSchema),
    defaultValues:{
       identifier:'',  
          password:'',
    }
  })
  

const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  const result = await signIn('credentials',{   //signin form from auth 
    redirect:false,
    identifier: data.identifier,
    password:data.password
  })

  if (result?.error){
  /* toast({
      title:"Login failed",
      description:"Incorrect username or password",
      variant:"destructive"
    })
      */

    if (result.error=='credentialsSignin') {
      toast({
      title:"Login failed",
      description:"Incorrect username or password",
      variant:"destructive"
      })
      
    }
    else{
      toast({
      title:"Login failed",
      description: result.error,
      variant:"destructive"
      })
    }
  }
 if (result?.url) {

  router.replace('/dashboard')
  
 }
}
return (
  <div className="flex justify-center items-center min-h-screen bg-gray-800">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Join True Feedback
        </h1>
        <p className="mb-4">Sign in to start your anonymous adventure</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <FormField
            name="identifier"
            control={form.control}
            render={({ field }) => (
            <FormItem>
            <FormLabel>Email/Username</FormLabel>
            <FormControl>
            <Input  placeholder="email/username"
            {...field} />
          </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
               
                <Input type="password" {...field} placeholder ="password" />
               
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit" className='w-full'>
          signIn
          </Button>
         {/*  <Button className='w-full' type="submit">Sign In</Button> */}
        </form>
      </Form>
      <div className="text-center mt-4">
        <p>
        Not a member yet?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

