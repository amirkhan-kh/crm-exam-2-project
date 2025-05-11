import React, {  useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash';
import type { AppDispatch, RootState } from '../../../store/store-config';
import { Image, Spin } from 'antd';
import { CiCalendar } from 'react-icons/ci';
import { GrMoney } from 'react-icons/gr';
import { BsPersonWorkspace } from 'react-icons/bs';
import { fetchUser } from '../../../store/create-slice';
import './_style.scss';



const ProfileInfo: React.FC = () => {
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
    <div className="flex flex-col gap-6">
      <div
        id="card"
        className="w-full rounded-2xl h-[204px] flex items-center justify-center px-9 py-7 relative overflow-hidden"
      >
        <img src="/public/toy.png" alt="Toy" className="absolute end-[-20px] top-[-20px]" />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3.5">
            <Image
              width={86}
              height={70}
              src={user?.avatar || "/public/Stats card/Icon/lesson type.png"}
              alt="avatar"
              className="rounded-4xl"
            />
            <div>
              <p className="text-[12px] font-normal text-white leading-[100%]">Xush kelibsiz!</p>
              <h2 className="text-[36px] font-semibold leading-[100%] text-white">
                {user?.full_name || 'Foydalanuvchi'}
              </h2>
              <span className="text-[12px] font-normal text-black px-2 py-0.5 rounded-[4px] leading-[100%] bg-white">
                {user?.role}
              </span>
            </div>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.4)] backdrop-blur-sm rounded-[13px] w-[264px] h-[128px] grid grid-cols-1 gap-5">
            <p>
              <span>Finance card</span>
              <br />
              <span>123454</span>
            </p>
            <p>
              <span>Current balance:</span>
              <span>{user?.salary_type || 'Nomaʼlum'}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card p-3 rounded-2xl bg-white h-[104px]">
          <div className="flex items-center justify-between">
            <BsPersonWorkspace />
            <p>Vazifalar</p>
          </div>
          <h2 className="text-center text-[20px] font-semibold">0 so'm</h2>
          <p className="text-center text-[15px] font-light">Group and individual</p>
        </div>
        <div className="card p-3 rounded-2xl bg-white h-[104px]">
          <div className="flex items-center justify-between">
            <GrMoney />
            <p>Rasmiy oylik</p>
          </div>
          <h2 className="text-center text-[20px] font-semibold">0 so'm</h2>
          <p className="text-center text-[15px] font-light">1 218 000 so’m</p>
        </div>
        <div className="card p-3 rounded-2xl bg-white h-[104px]">
          <div className="flex items-center justify-between">
            <CiCalendar />
            <p>Norasmin oylik</p>
          </div>
          <h2 className="text-center text-[20px] font-semibold">0 so'm</h2>
          <p className="text-center text-[15px] font-light">1 218 000 so’m</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo