import React, { useState } from 'react'
import ROLE from '../api/role'
import { MdClose } from "react-icons/md";
import FullApi from '../api/appApi';
import { toast } from 'react-toastify';


const ChangeUserRole = ({
    userId,
    name,
    email,
    role,
    onClose,
    callFunc
    }) => {

    const [userRole, setUserRole] = useState(role);


    const handleOnChangeSelect =(e) => {
        setUserRole(e.target.value)
    }

    //http://localhost:8080/api/update_user
    //  

    const updateUserRole = async () =>{
        const fetchResponse = await fetch(FullApi.userUpdate.url,{
            method : FullApi.userUpdate.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json",
            },
            body: JSON.stringify({
                userId : userId,
                role : userRole,
            })
        })

        console.log('fetchdata', fetchResponse)

        const dataResponse = await fetchResponse.json();  

        console.log('updatedata', dataResponse)

        if(dataResponse.success){
            toast.success(dataResponse.messeage);
            onClose()
            callFunc()
        }
        
    }

    return (
    <div className='fixed flex top-0 bottom-0 left-0 right-0 w-full h-full z-10 justify-center items-center mx-auto bg-slate-200 bg-opacity-50'>
      <div className='bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto pb-2' onClick={onClose}>
                < MdClose />
            </button>
            <h1 className='pb-4 font-medium text-lg'>Change User Role</h1>
            
            <p>Name: {name}</p>
            <p>Email: {email}</p>

            <div className='flex items-center justify-between my-4'>
                <p>Role: </p>
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button className='w-fit mx-auto block bg-orange-600 hover:bg-orange-700  px-2 py-1 rounded-full text-white' onClick={updateUserRole}>Change Role</button>
      </div>
    </div>
  )
}

export default ChangeUserRole
