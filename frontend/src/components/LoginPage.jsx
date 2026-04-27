import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import App from '../App'


export default function LoginPage() {

  const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


  const login = async (e) => {
    e.preventDefault()
    try {
     const res = await axios.post("http://localhost:9876/login", {email, password})
     if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('email', res.data.email)

        navigate("/chat")
      
     }
    } catch (error) {
      console.log(error);
    } 
  }
  return (
   
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white px-10 md-20 py-20 md:py30 rounded-3xl border-2 border-gray-200 shadow-lg m-3">
        <h1 className="text-5xl sm:text-3xl font-semibold">Welcome Back!</h1>
        <p className="font-medium text-lg sm:text-sm text-gray-500 mt-4">Welcome back! Please enter your details</p>
        <div className="mt-8">
          
          <div>
            <label htmlFor="" className="text-lg sm:text-sm font-medium">Email</label>
            <input 
                 type="email" 
                 placeholder="Enter your email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"/>
          </div>
          <div>
            <label htmlFor="" className="text-lg font-medium">Password</label>
            <input 
                 type="password" 
                 placeholder="Enter your password"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"/>
          </div>
          <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" name="" id="remember" className="checked:accent-green-700" />
            <label htmlFor="remember" className="ml-2 font-medium text-base">Remember me</label>
          </div>
          <button className="font-medium text-base text-green-700 cursor-pointer hover:underline">Forgot password</button>
          </div>
          <div className="mt-8 flex flex-col">
            <button onClick={login} className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-green-700 text-white text-lg font-bold">Login</button>
          </div>
          <div className='mt-5 flex  justify-center space-x-1'>
            <p>Don't have an account?</p> 
            <Link to="/signup" className='text-green-700 hover:text-green-500 hover:underline cursor-pointer'>Signup</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
