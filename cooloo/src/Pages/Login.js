import React, { useContext, useState } from "react";
import loginIcons from "../assest/assest/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import FullApi from "../api/appApi";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

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

    const dataResponse = await fetch(FullApi.signIN.url,{
      method: FullApi.signIN.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  console.log("data login", data);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className=" p-4 py-7 w-full max-w-md mx-auto bg-white">
          <div className="w-20 h-20 mx-auto ">
            <img src={loginIcons} alt="login icon" className="rounded-full" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
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
              <Link
                to={"/forgot-password"}
                className="block ml-auto w-fit hover:underline hover:text-orange-600 "
              >
                Forgot password
              </Link>
            </div>
            <button className="bg-orange-600 px-6 py-2 hover:scale-110 transition-all text-white max-w-[150px] w-full rounded-full cursor-pointer mx-auto block mt-4">
              Login
            </button>
          </form>
          <p className="mt-4">
            Don't have an account ?{" "}
            <Link
              to={"/signup"}
              className="text-orange-600 hover:underline hover:text-orange-700"
            >
              Sign up
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
