import { IoIosNotificationsOutline } from "react-icons/io";
import { IoApps, IoSearch } from "react-icons/io5";
import { Button, Image, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import './_style.scss'
import type { IUser } from "../ui/profile-info-card";
const Header: React.FC = () => {
    const [user, setUser] = useState<IUser | null | string >(null);

    useEffect(()=> {
      const accsessToken = localStorage.getItem("token")
      
      if(accsessToken) return
    }, [])
  return (
   <header className='mx-auto flex items-center justify-between h-16 px-10' > 
    <div className="flex  items-center gap-1">
      <Image src="/public/Logo.png" width={32} height={32} alt='Logo NovEnter'/>
      <h1 className="text-[25px] leading-[120%] font-medium"><strong>NovEnter</strong></h1>
    </div>
    <form action="#" className="w-[400px]">
      <Input prefix={<IoSearch color="#8A94AD"/>} placeholder='Search' style={{borderRadius: "99px", color: '#8A94AD'}}/>
    </form>
    <div className="flex  items-center ">
    <Button  shape="circle" className="p-1"></Button>
    <Button  ><IoIosNotificationsOutline /></Button>
    <Button  shape="circle"><IoApps /></Button>
    <Button  shape="circle"><img src={user?.avatar} width={40} height={40} alt='avatar'/></Button>
    </div>
   </header>
  )
}

export default Header
