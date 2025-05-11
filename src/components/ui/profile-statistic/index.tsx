import React, { useEffect, useRef } from 'react';
import { MdOutlinePersonPin } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { Spin } from 'antd';
import type { AppDispatch, RootState } from '../../../store/store-config';
import { fetchUser } from '../../../store/create-slice/index.ts';
import { fetchCompany } from '../../../store/company-get/index.tsx';



const ProfileStatistic: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);
  const dispatch2 = useDispatch<AppDispatch>();
  const { company, loadingg, errorr } = useSelector((state: RootState) => state.company); 
  
  const throttledFetchUserRef = useRef(
    throttle((token: string) => {
      dispatch(fetchUser(token));
    }, 5000)
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch2(fetchCompany());
    if (token && !user) {
      throttledFetchUserRef.current(token);
    }
  }, [user, dispatch2]);

  if (loading) return <div><Spin/></div>;
  if (loadingg) return <div><Spin/></div>;
  if (error) return <div>Error: {error}</div>;
  if (errorr) return <div>Error: {error}</div>;

  return (
    <div className='p-3 rounded-2xl bg-white h-[190px] flex flex-col justify-between'>
      <h3 className='flex items-center gap-1 text-[12px] font-semibold'>
        <MdOutlinePersonPin size={20} /> Ma'lumotlar
      </h3>
      <div className="grid grid-cols-2 gap-12 pt-2.5">
        <ul className='grid grid-cols-1 gap-4'>
          <li className='text-[14px] font-semibold'>Telefon raqam: +998939542111</li>
          <li className='text-[14px] font-semibold'>Email: {user?.email}</li>
          <li className='text-[14px] font-semibold'>Birthday: {user?.birth_date}</li>
          <li className='text-[14px] font-semibold'>Gender: {user?.gender}</li>
        </ul>
        <ul className='grid grid-cols-1 gap-4'>
          <li className='text-[14px] font-semibold'>Kompaniya nomi: {company?.name}</li>
          <li className='text-[14px] font-semibold'>INN: {company?.id}</li>
          <li className='text-[14px] font-semibold'>Ro'yxatdan o'tgan sana: {user?.birth_date}</li>
          <li className='text-[14px] font-semibold'>Litsensiya: {company?.address || "NovEnter"}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileStatistic;
