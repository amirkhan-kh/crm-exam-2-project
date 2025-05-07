import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './_style.scss';
import { Aside, Header } from '../../components';

const Dashboard: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    if (!isAuth) {
      const timeout = setTimeout(() => {
        nav("/auth");
      }, 1500);

      return () => clearTimeout(timeout); 
    }
  }, [nav]);

  return (
    <main className='mx-auto'>
      <Header />
      <section className='wrapper flex '>
        <Aside />
        <section id='rout' className='px-10 py-4 w-full bg-[#d7d6d63c]'>
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
