import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../api/role';


const Adminpanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN){
      navigate("/");
    }
  },[user])

  return (
    <div className='min-h-[calc(100vh-120px)]  md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-32 flex justify-center items-center flex-col pt-10'>
          <div className="text-3xl cursor-pointer">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <FaRegCircleUser />
              )}
          </div>
          <p className='capitalize font-semibold text-lg'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>

        <div> 
          <nav className='grid p-8'>
            <Link to={"all-users"} className='px-2 p-1 hover:bg-slate-100'>All User</Link>
            <Link to={"all-products"} className='px-2 p-1 hover:bg-slate-100'>All Products</Link>
          </nav>
        </div>
      </aside>

      <main className='h-full w-full p-2'>
        
        <Outlet/>
      </main>
    </div>
  )
}

export default Adminpanel
