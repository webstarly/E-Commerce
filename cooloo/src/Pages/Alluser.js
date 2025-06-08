import React, { useEffect, useState } from 'react'
import FullApi from '../api/appApi'
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../Components/ChangeUserRole';

const Alluser = () => {
    const [allUsers,setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id: ""
    })

    const fetchAllUsers = async() => {
        const fetchData = await fetch(FullApi.getAllUsers.url,{
            method : FullApi.getAllUsers.method,
            credentials : "include"
        })
        const dataResponse = await fetchData.json();

        console.log("data-alluser", dataResponse)

        if(dataResponse.success){
            setAllUsers(dataResponse.data);
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
    }

    useEffect(() =>{
        fetchAllUsers();
    },[]);
    
  return (
    <div className='pb-4 bg-white'>
        <table className='w-full userTable'>
            <thead className='bg-black text-white'>
                <tr>
                    <th>Sr</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUsers.map((el,index)=> {
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('ll')}</td>
                                <td>
                                    <button className='bg-green-300 p-2 rounded-full hover:bg-green-500 cursor-pointer hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)
                                    }}>
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
            {
                openUpdateRole && (
                    <ChangeUserRole  
                    onClose={(e)=>setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                    />
                )
            }
    </div>
  )
}

export default Alluser
