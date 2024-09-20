import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../images/mylogo.webp';
import apiUrl from '../backendUrl/index';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({email:'',name:'',address:'',phone:null,password:'',role:'general',cpassword:''});
  
  function handleSubmit(e){
    e.preventDefault();
  const loginRes = fetch(apiUrl.signup.url, {
    method: apiUrl.signup.method ,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Login successful, redirect to dashboard or home page
      toast.success('sucess')
      navigate('/login')

    } else {
      // Login failed, display error message
      toast.sucess(data.message)

      console.log(data.message);
    }
  })
  .catch(error => {
    toast.error(error)

    console.error('Error:', error);
  });
  }
  return (
      <div className="relative min-h-screen ">
        <img
          src={backgroundImage}
          alt="Background image"
          className="w-full h-[120vh] object-fill bg-cover bg-center z-0"
        />
        <div className="absolute mt-4 top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 mx-4">
          <div className="relative bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full py-2 px-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.name}
                  onChange={(e)=>setUserData({...userData,name:e.target.value}) }
                />
                  </div>
                <div className="mb-4">
                <input
                  type="number"
                  placeholder="Phone no"
                  className="w-full py-2 px-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.phone}
                  onChange={(e)=>setUserData({...userData,phone:e.target.value}) }
                
                />
              </div>
                <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full py-2 px-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.address}
                  onChange={(e)=>setUserData({...userData,address:e.target.value}) }
                
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full py-2 px-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.email}
                  onChange={(e)=>setUserData({...userData,email:e.target.value}) }
                
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full py-2 px-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Password"
                  value={userData.password}
                  onChange={(e)=>setUserData({...userData,password:e.target.value}) }
              
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full py-2 px-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.cpassword}
                  onChange={(e)=>setUserData({...userData,cpassword:e.target.value}) }
                
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Signup
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Have an account? <Link to ="/signup" className="text-blue-500 hover:text-blue-600">Login</Link>
            </p>
          </div>
        </div>
      </div>
    
  )
}

export default Signup
