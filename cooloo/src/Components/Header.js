import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GoSearch } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FullApi from "../api/appApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../api/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false); 
  const context = useContext(Context);
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)


  console.log("userhead", user)

  const handleLogout = async (e) => {
    const fetchData = await fetch(FullApi.userLogout.url, {
      method: FullApi.userLogout.method,
      credentials: "include",
    });
    const dataApi = await fetchData.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };


  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"} >
            <Logo w={100} h={60} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search for product..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-orange-600 flex items-center justify-center rounded-r-full text-white">
            <GoSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div
            className="relative flex justify-center"
            onClick={() => setMenuDisplay((preve) => !preve)}
          >
            {user?._id && (
              <div className="text-3xl cursor-pointer">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bottom-0 top-11 h-fit p-2 bg-white shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-1"
                      onClick={(e) => setMenuDisplay(true)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {
            user?._id && (
              <Link to={'/Cart'} className="text-2xl relative">
                <span>
                  <FaShoppingCart />
                </span>
                <div className="bg-orange-600 text-white w-5 h-5 flex items-center justify-center p-1 rounded-full absolute -top-2 -right-2 ">
                  <p className="text-xs">{context?.cartProductCount}</p>
                </div>
              </Link>
            )
          }
         
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-orange-600 text-white rounded-full hover:bg-orange-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/Login"}
                className="px-3 py-1 bg-orange-600 text-white rounded-full hover:bg-orange-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
