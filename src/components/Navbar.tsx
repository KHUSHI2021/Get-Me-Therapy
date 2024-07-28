"use client"
import React from 'react'
import Link from 'next/link'
import{useSession, signOut} from 'next-auth/react'
import {User} from 'next-auth'
// import messages from '@/messages.json';
// mostly whererver use keyword shown in the data not get direct data come from hook (also method)
import { Button } from './ui/button'
const Navbar=()=> {
    
    const{data: session}=useSession()

    const user: User = session?.user as User // we write session here bcz in documentation 2) data not come directly to the session bcz session data push to user thats why data extract from user

  return (

 <nav className='p-4 mb:p-6 shadow-md'>
    <div className='container mx-auto flex flex flex-col md:flex-row justify-between items-center'
    >
        <a className='text-xl font-bold mb-4 md:mb-0'href="#">Mystry message</a>
        {
            session ?(
                <>
                <span className='mb-5'> welcome. {user.username || user.email}</span>
               <button className = 'w-full md:w-auto' onClick={()=> signOut()}> Logout</button>

</>
            ):(
                <Link href="/sign-in" >
                    <button className = 'w-full md:w-auto'>Login</button>
                  </Link>
            )
        }
    </div>
 </nav>
  )
}

export default Navbar
