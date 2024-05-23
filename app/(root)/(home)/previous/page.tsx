import CallListComponent from '@/components/CallListComponent'
import { avatarImages } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Previous = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Previous</h1>
      <CallListComponent type='ended'/>
      
    </section>
  )
}

export default Previous