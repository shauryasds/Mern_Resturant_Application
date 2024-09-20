import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../images/mylogo.webp';
import apiUrl from '../backendUrl/index';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slice/UserSlice';
import { toast } from 'react-toastify';
function Login() {
  const dispatch =useDispatch();
  const navigate=useNavigate()
  const [userData, setUserData] = useState({email:'',
  
password:''});
async function handleSubmit(e) {
  e.preventDefault();
  const loginRes = await fetch(apiUrl.login.url, {
    method: apiUrl.login.method ,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials:'include',

    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      toast('Logged IN');
      dispatch(setUser(data))
    
      navigate('/')
    } else {
      // Login failed, display error message
      toast(data.message);

      console.log(data.message);
    }
  })
  .catch(error => {
    toast(error);

    console.error('Error:', error);
  });
}
  return (
    <div className="relative min-h-screen  ">
      <img
        src={backgroundImage}
        alt="Background image"
        className="w-full h-[100vh] object-fill bg-cover bg-center z-0"
      />
      <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 mx-4">
        <div className="relative bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-4">
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, "email":e.target.value })}
                placeholder="Email"
                className="w-full py-2 px-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, "password":e.target.value })}
                
                className="w-full py-2 px-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Password"
              />
            </div>
            <button
              type="submit"
              
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Don't have an account? <Link to ="/signup" className="text-blue-500 hover:text-blue-600">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;