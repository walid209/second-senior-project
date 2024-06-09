"use client"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io"
import { CiLogout } from "react-icons/ci";

import React, { useEffect, useState } from "react"
import { useAuth } from './components/context/AuthContext';



export default function Home() {
  const router=useRouter()
  
  const [data, setData] = useState([]);
  const { user, seller, admin, logOut ,token} = useAuth();
  
  const [open, setOpen] = useState<boolean>(false);
  const [menuView, setMenuView] = useState<boolean>(false);
    const signOut = () => {
      logOut();
    };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setMenuView(!menuView);
  };
 

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products", {
        headers: localStorage.getItem("token"),
      })
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      }) 
      
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const renderNavBar = () => {
    // if (admin) {
      // return <AdminNavBar toggleMenu={toggleMenu} menuView={menuView}  signout={signOut}/>;
    // } 
    if (seller) {
      return <SellerNavBar  toggleMenu={toggleMenu} menuView={menuView} signout={signOut} router={router}/>;
    } else if (user) {
      return <UserNavBar  toggleMenu={toggleMenu}menuView={menuView} signout={signOut} router={router}/>;
    } else {
      return <DefaultNavBar router={router} />;
    }
  };

  return <nav>{renderNavBar()}</nav>;
}

// const AdminNavBar = ({toggleMenu,menuView,signout}) => 
//   (
//   <div className="grid min-h-[90px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
    {/* <Admin/> */}
    {/* <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
    <nav
      className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <a href="/HomePage" onClick={()=>router.push('/HomePage')}
          className="mr-4 block cursor-pointer py-2 font-sans text-base font-medium leading-relaxed text-inherit antialiased text-2xl">
        Dashbord
        </a>
        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/AdminApp"  onClick={()=>router.push('/AdminApp')}  className="flex items-center">
                  Seller
                </a>
              </li>
             
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/User" className="flex items-center">
                  User
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <a href="/About" className="flex items-center text-blue-gray-900">
                  About
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/AddProduct" className="flex items-center">
                <IoMdAdd />  Add Product
                </a>
              </li>
              

            </ul>
           
            
          </div>
          <div className="flex items-center gap-x-1 text-black">
          {menuView && (
          <div className="absolute top-12 right-12 bg-white shadow-md rounded-md py-2 w-48">
          
            <span
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => signout()}
            >
             <CiLogout /> Logout
            </span>
          </div>
        )}

         
          </div>
       
        </div>
      </div>
    </nav>
    </div> */}
  {/* </div>
); */}

const SellerNavBar = ({toggleMenu,menuView,signout,router}) => (
  <div className="grid min-h-[90px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
    <nav
      className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <a href="/HomePage" onClick={()=>router.push('/HomePage')}
          className="mr-4 block cursor-pointer py-2 font-sans text-base font-medium leading-relaxed text-inherit antialiased text-2xl">
          exclusive
        </a>
        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/Contact" className="flex items-center">
                  Contact
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/Panier" className="flex items-center">
                  panier
                </a>
              </li>


              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/EditProfile" className="flex items-center">
                  EditProfile
                </a>
              </li>



              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <a href="/About" className="flex items-center text-blue-gray-900">
                  About
                </a>
              </li>

              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/AddProduct" className="flex items-center">
                  Add Product
                </a>
              </li>

              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/Wishlist" className="flex items-center">
                  like
                </a>
              </li>
              
           

            </ul>
           
            
          </div>
          <div className="flex items-center gap-x-1 text-black">
            
        
          </div>
          <button
          className="absolute top-4 right-12 h-8 w-8 bg-black rounded-full text-white flex items-center justify-center"
          onClick={toggleMenu}
        >
         <FaRegUserCircle  className='icon'/>
        </button>
        {menuView && (
          <div className="absolute top-12 right-12 bg-white shadow-md rounded-md py-2 w-48">
            <span
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => router.push("/EditProfile")}
            >
            <FaRegEdit />  
            </span>
            <span
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => signout()}
            >
             <CiLogout /> Logout
            </span>
          </div>
        )}
        </div>
      </div>
    </nav>
  
    </div>
  </div>
);

const UserNavBar = (toggleMenu,menuView,signout,router) => (
  <div className="grid min-h-[90px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
    <nav
      className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <a href="/HomePage" onClick={()=>router.push('/HomePage')}
          className="mr-4 block cursor-pointer py-2 font-sans text-base font-medium leading-relaxed text-inherit antialiased text-2xl">
          exclusive
        </a>
        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-black">
                <a href="/Contact" className="flex items-center">
                  Contact
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <a href="/About" className="flex items-center text-blue-gray-900">
                  About
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <a href="/Panier" className="flex items-center text-blue-gray-900">
                  panier
                </a>
              </li>
            </ul>
           
            
          </div>
          <div className="flex items-center gap-x-1 text-black">
            
          <li className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block">
                <a href="/Signin" className="flex items-center text-blue-gray-900">
                  Signup
                </a>
              </li>
              <button
          className="absolute top-4 right-12 h-8 w-8 bg-black rounded-full text-white flex items-center justify-center"
          onClick={toggleMenu}
        >
         <FaRegUserCircle  className='icon'/>
        </button>
        {menuView && (
          <div className="absolute top-12 right-12 bg-white shadow-md rounded-md py-2 w-48">
            <span
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => router.push("/Wishlist")}
            >
              WishList
            </span>
            <span
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => signout()}
            >
            logout
            </span>
          </div>
        )}

          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor"
                stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </nav>
    </div>
  </div>
);

const DefaultNavBar = ({router}) => (
  <div className="grid min-h-[90px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
   <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
   <div className="flex items-center justify-between text-blue-gray-900">
        <a href="/HomePage" onClick={()=>router.push('/HomePage')}
          className="mr-4 block cursor-pointer py-2 font-sans text-base font-medium leading-relaxed text-inherit antialiased text-2xl">
          exclusive
        </a>
        </div>
    <div className="flex items-center gap-x-1 text-black">
            
            <li className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block">
                  <a href="/Signin" className="flex items-center text-blue-gray-900">
                    Signup
                  </a>
                </li>
            </div>
            </nav>
    </div>
  </div>
);