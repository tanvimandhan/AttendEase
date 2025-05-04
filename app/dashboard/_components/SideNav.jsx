"use client"
import { useUser } from "@stackframe/stack"
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from 'react'
import { useEffect } from "react"

function SideNav() {
  
  const user = useUser();
 // console.log(user);

  const menuList=[
    {
      id:1,
      name:'Dashboard',
      icon:LayoutIcon,
      path:'/dashboard'
    },
    {
      id:2,
      name:'Students',
      icon:GraduationCap,
      path:'/dashboard/student'
    },
    {
      id:3,
      name:'Settings',
      icon:Settings,
      path:'/dashboard/settings'
    },
    {
      id:4,
      name:'Attendance',
      icon:Hand,
      path:'/dashboard/attendance'
    }
  ]
  const path=usePathname();
  useEffect(()=>{
     console.log(path);
  },[])
  return (
    <div className='border shadow-md h-screen'>
      <Image src={'/logo.svg'} width={180} height={50} alt='logo'/>
      <hr className='my-5'/>
        {menuList.map((menu,index)=>(
          <Link  key={menu.id} href={menu.path}>
          <h2  className={`flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-blue-700 hover:text-white cursor-pointer rounded-lg my-2 ${path === menu.path ? 'bg-blue-700 text-white' : ''}`}>
            <menu.icon/>
            {menu.name}
          </h2>
          </Link>
        ))}
        <div className="flex gap-2 items-center bottom-5 fixed p-2">
          <Image src={user?.profileImageUrl} alt='user' width={35} height={35} className='rounded-full'/>
          <div>
             <h2 className="text-sm font-bold">{user?.displayName}</h2>
             <h2 className="text-xs text-slate-400">{user?.primaryEmail}</h2>
          </div>
        </div>
    </div>
    
  )
}

export default SideNav