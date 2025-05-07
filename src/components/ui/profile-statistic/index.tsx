import React, { useEffect } from 'react'
import { MdOutlinePersonPin } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store-config';
import { fetchUser } from '../../../store/create-slice.ts';
import { Spin } from 'antd';

const ProfileStatistic: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token){
      dispatch(fetchUser(token))
    };

  }, [dispatch]);
  if (loading) return <div><Spin/></div>;
  if (error) return <div>Error: {error}</div>;
      
    return (
        <div className='p-3 rounded-2xl bg-white h-[190px] flex flex-col justify-between'>
            <h3 className='flex items-center gap-1 text-[12px] font-semibold'><MdOutlinePersonPin size={20} /> Malumotlar</h3>
            <div className="grid grid-cols-2 gap-12 pt-2.5">
                <ul className='grid grid-cols-1 gap-4'>
                    <li className='text-[14px] font-semibold'>Telifon raqam: +998939542111</li>
                    <li className='text-[14px] font-semibold'>Email: {user?.email}</li>
                    <li className='text-[14px] font-semibold'>Birthday: {user?.birth_date}</li>
                    <li className='text-[14px] font-semibold'>Gender: {user?.gender}</li>
                </ul>
                <ul className='grid grid-cols-1 gap-4'>
                    <li className='text-[14px] font-semibold'>Kompaniya nomi: {user?.company_id}</li>
                    <li className='text-[14px] font-semibold'>INN: {user?.id}</li>
                    <li className='text-[14px] font-semibold'>Ro'yxatdan o'tgan sana: {user?.birth_date}</li>
                    <li className='text-[14px] font-semibold'>Litsensiya: {user?.company_id}</li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileStatistic
