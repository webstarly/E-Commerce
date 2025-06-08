import React, { useState } from "react";
import loginIcons from "../assest/assest/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from "../Imageconverter/imageTobase64";
import FullApi from "../api/appApi";
import { toast } from "react-toastify";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnClick = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //FullApi.signUP.url
    //FullApi.signUP.method

    if (data.password === data.confirmPassword) {  
      const dataResponse = await fetch(FullApi.signUP.url, {
        method: FullApi.signUP.method, 
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if(dataApi.success){
        toast.success(dataApi.message);
        navigate("/login");
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }

    } else {
      toast.error("Password and Confirm password are not the same")
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  //for checks
  console.log("data login", data);

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className=" p-4 py-7 w-full max-w-md mx-auto bg-white">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icon" />
            </div>
            <form>
              <label>
                <div className="text-xs text-center pb-4 pt-2 bottom-0 w-full bg-slate-200 absolute cursor-pointer bg-opacity-80">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnClick}
                  required
                  placeholder="enter your name"
                  className="w-full h-full outline-none bg-transparent text-black"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleOnClick}
                  required
                  placeholder="enter email"
                  className="w-full h-full outline-none bg-transparent text-black"
                />
              </div>
            </div>
            <div>
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnClick}
                  required
                  className="w-full h-full outline-none bg-transparent text-black"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span className="text-xl">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnClick}
                  required
                  className="w-full h-full outline-none bg-transparent text-black"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span className="text-xl">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-orange-600 px-6 py-2 hover:scale-110 transition-all text-white max-w-[150px] w-full rounded-full cursor-pointer mx-auto block mt-4">
              Sign up
            </button>
          </form>
          <p className="mt-4">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-orange-600 hover:underline hover:text-orange-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
