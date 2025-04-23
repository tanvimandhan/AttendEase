'use client'
import { useUser } from '@stackframe/stack'
import React from 'react'
import Image from 'next/image';
function Header() {
  const user=useUser();
  return (
    <div className='p-4 shadow-sm border flex justify-between'>
       <div>
         
       </div>
       <div>
         <Image src={user?.profileImageUrl} width={35} height={35} alt='user' className='rounded-full'/>
       </div>
    </div>
  )
}

export default Header