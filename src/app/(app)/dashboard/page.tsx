'use client'

import { Message } from "@/app/model/User"
import { useToast } from "@/components/ui/use-toast"
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse"
import MessageCard from "@/components/MessageCard"
import { Loader2, RefreshCcw } from "lucide-react"
import { Button } from '@/components/ui/button';
import { Separator } from "@radix-ui/react-separator"
import { useCopyToClipboard } from "usehooks-ts"
import { Switch } from "@radix-ui/react-switch"
import { User } from "next-auth"

//import { Message } from "postcss"
//import messages from '@/messages.json';



const page=()=> {

  const [messages, setMessages]=useState<Message[]>([])
  const [isLoading,setIsLoading]=useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)


  const {toast}=useToast()

  const handleDeleteMessage = (messageId:string)=>{setMessages(messages.filter((message)=>message._id!==messageId))}

  const{data: session} = useSession()

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema)
      
  })

  const {register, watch ,setValue} =form; 

  const acceptMessages = watch('acceptMessages')
    
  const fetchAcceptMessage = useCallback(async ()=>{
    setIsSwitchLoading(true)
    try{
      const response = await axios.get('/api/accept-messages')
      setValue(' acceptMessages' ,response.data.isAcceptingMessage)
    }
    catch(error){
     const AxiosError =error as AxiosError<ApiResponse>;
     toast ({
      title:"Error",
      description:AxiosError.response?.data.message || "Failed to fetch message settings",
      variant:"destructive"
     })
    }
finally{
  setIsSwitchLoading(false)
}
  }, [setValue, toast ])

  const fetchMessages = useCallback(async (refresh: boolean = false)=>{
    setIsLoading(true)
    setIsSwitchLoading(false)

    try {
      const reponse = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(reponse.data.messages || [])
      if(refresh){
        toast({
        title:"Resfreshed messages",
        description: "showing latest messages",

      })
    }
  }
      catch(error){
        const AxiosError =error as AxiosError<ApiResponse>;
        toast ({
         title:"Error",
         description:AxiosError.response?.data.message || "Failed to fetch message settings",
         variant:"destructive"
        })
    }
    finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  },[setIsLoading,setMessages])

  useEffect(()=>{
    if (!session || !session.user) return 
          fetchMessages()
           fetchAcceptMessage()
  },[session , setValue , fetchAcceptMessage,fetchMessages])

  const handleSwitchChange = async()=>{
    try {

      const response = await axios.post<ApiResponse>('/api/accept-message',
        {
          accepMessages: !acceptMessages
        }
      )    
      setValue('acceptMessages',!acceptMessages)
      toast({
        title:response.data.message,
        variant:"default"

      })
    } catch (error) {

      const AxiosError =error as AxiosError<ApiResponse>;
      toast ({
       title:"Error",
       description:AxiosError.response?.data.message || "Failed to fetch message settings",
       variant:"destructive"
      })
      
    }
  }

const {username} = session?.user as User
const baseUrl = '${window.location.protocol}//${window.location.host}'
const profileUrl = '${baseUrl}/u/${username}'

const copyToClipboard =()=>{
  navigator.clipboard.writeText(profileUrl)       
     toast({
        title : "URL copied",
        description: "profile URL has been copied to clipboard"
     })                                           //navigator  available in client component

}
  if(!session|| !session.user){
    return <div>please login</div>
  }
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={useCopyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key = {message._id}
              message = {message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
  
}

export default page
