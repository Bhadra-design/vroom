import CallListComponent from '@/components/CallListComponent'
import React from 'react'

const Reacordings = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Recordings</h1>

      <CallListComponent type='recordings'/>
    </section>
  )
}

export default Reacordings