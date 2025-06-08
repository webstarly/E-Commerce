import React, { useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FullApi from "../api/appApi";
import { toast } from "react-toastify";

const Resetpassword = () =>{

    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");

    const navigate = useNavigate();

    const [message , setMessage] = useState("");
    const [newPassword , setNewPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");

        const response = await fetch(`${FullApi.resetPassword.url}?token=${token}`,{
            method : FullApi.resetPassword.method,
            credentials : "include",
            headers: {
               "content-type": "application/json" 
              },
            body: JSON.stringify({ newPassword })
          })

          const responseData = await response.json();
          console.log("responseDataforget", responseData)

          if(responseData.success){
            toast.success(responseData.message);
            navigate("/login")
          }
    }


    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            {message && <p className="text-orange-600">{message}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="password"
                    placeholder="Enter new password"
                    className="p-2 border rounded"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button className="bg-orange-600 text-white p-2 rounded" type="submit">
                    Reset Password
                </button>
            </form>
        </div>
    )
}
export default Resetpassword
