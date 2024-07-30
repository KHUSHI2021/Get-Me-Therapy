'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

import messages from "@/messages.json"

import Autoplay from "embla-carousel-autoplay"

const Home =() => {
<>

  return (
{/*  skeleten effect when data load the it will show */}

    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  
<main className = 'flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>
 <section className="text-center mb-8 md:mb-12">
 <h1 className='text-3xl md:text-5xl font-bold'>
  Dive into te world Anonymous conversation
  </h1>
  <p className="mt-3 md:mt-4 text-base md:text-lg">Explore Mystery Message - where your identity remains a secret.</p>
 </section>

 <Carousel 
 plugins={[Autoplay({delay: 2000})]}
 className="w-full max-w-xs">
      <CarouselContent>
        {
          messages.map((message,index)=>(

            <CarouselItem key={index}>
            <div className="p-1">
              <Card>
             < CardHeader>
             {message.title}
             </CardHeader>

                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-lgs font-semibold">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </main>

  <footer className="text-center p-4 md:p-6"> @2024 Mystery message. All right reserved</footer>
  )

  </>
}

export default Home
