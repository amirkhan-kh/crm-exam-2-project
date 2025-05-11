import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IoApps, IoSearch } from "react-icons/io5";
import { Button, Image, Input, Spin } from 'antd'
import './_style.scss'
import type { AppDispatch, RootState } from "../../store/store-config";
import { fetchUser } from '../../store/create-slice';
import { throttle } from 'lodash';
import { NavLink } from 'react-router-dom';
const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  const throttledFetchUserRef = useRef(
    throttle((token: string) => {
      dispatch(fetchUser(token));
    }, 40000)
  );
  const hasFetchedRef = useRef(false)
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token && !user && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      throttledFetchUserRef.current(token);
    }
  }, [user]);
  if(loading) {
    <div><Spin/></div>
  }
  if(error){
    <div>....</div>
  }
  return (
   <header className='mx-auto flex items-center justify-between h-16 px-10' > 
    <div className="flex  items-center gap-4">
      <Image src="/public/Logo.png" width={32} height={32} alt='Logo NovEnter'/>
      <h1 className="text-[25px] leading-[120%] font-medium"><strong>NovEnter</strong></h1>
    </div>
    <form action="#" className="w-[400px]">
      <Input prefix={<IoSearch color="#8A94AD"/>} placeholder='Search' style={{borderRadius: "99px", color: '#8A94AD'}}/>
    </form>
    <div className="flex  items-center gap-2">
    <Button  shape="circle"><IoApps /></Button>
    <NavLink to='/' className="flex items-center gap-2 text-[12px] font-semibold">
    <Button  shape="circle"><img src={user?.avatar} width={30} height={0} alt='avatar'/></Button>
    <p>{user?.full_name}</p>
    </NavLink>
    </div>
   </header>
  )
}

export default Header
