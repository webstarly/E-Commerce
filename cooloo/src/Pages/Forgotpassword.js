import React, { useState } from 'react'
import FullApi from '../api/appApi';
import { toast } from 'react-toastify';

const Forgotpassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setMessage("");

    const response = await fetch(FullApi.forgetPassword.url,{
      method : FullApi.forgetPassword.method,
      credentials : "include",
      headers: {
         "Content-Type": "application/json" 
        },
      body: JSON.stringify({ email })
    })

    const responseData = await response.json();

    if(responseData.success){
      toast.success("Reset mail sent to your mail")
    }

    console.log('responseData', responseData)
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
            {message && <p className="text-orange-600">{message}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="bg-orange-500 text-white p-2 rounded" type="submit">
                    Send Reset Link
                </button>
            </form>
        </div>
  )
}

export default Forgotpassword
