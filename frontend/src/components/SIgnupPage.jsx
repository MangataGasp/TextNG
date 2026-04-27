import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
 import { Link } from 'react-router-dom'; 

export default function SignupPage() {

   const navigate = useNavigate() 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 /*      const [formData, setFormData] = useState({
             name: "",
             email: "",
             password: "",
            })
      
             const [errors, setErrors] = useState({})
      
        const [submittedData, setSubmittedData] = useState(null);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          setSubmittedData(formData);
      
          const validationErrors = {}
          if (!formData.name.trim()) {
            validationErrors.name = "Name is Required"
          }
      
          if (!formData.email.trim()) {
            validationErrors.email ="email is required"
          } else if (!/\S+@\S+\.\S+/.test(formData.email)){
            validationErrors.email ="email not valid"
          }
      
          if(!formData.password.trim()) {
            validationErrors.password = "PassWord Required"
          } else if (formData.password.length < 8) {
            validationErrors.password = "Min. Character is 8"
          }
          setErrors(validationErrors)
      
          if(Object.keys(validationErrors).length === 0) {
            setSubmittedData(formData)
            alert("Form Submitted");
             setFormData({ name: "", email: "", password: "" });  
          }
        };
 */
      
        const regsiter = async () => {
          if (!email || !password) return
          try {
            await axios.post('http://localhost:9876/register', {email, password}) 
            setEmail("")
            setPassword("")

            navigate("/login")
          } catch (err) {
            console.log(err)
          } 
        }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-lg m-3">
        {/* Header and sub-text */}
        <h1 className="text-5xl sm:text-3xl font-semibold">Create an account</h1>
        <p className="font-medium text-lg sm:text-sm text-gray-500 mt-4">Sign up for early access to our new updates</p>
        <div className="mt-8">
          
            <div>
            <label htmlFor="" className="text-lg font-medium">Email</label>
            <input 
                 type="email"
                 name="email"
                 placeholder="Enter your email"
                 className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-green-700"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
          </div>
          <div>
            <label htmlFor="" className="text-lg font-medium">Password</label>
            <input 
                 type="password" 
                 name="password"
                 placeholder="Enter your password"
                 required
                 className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-green-700"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 />
          </div>

          <div className="mt-8 flex flex-col">
            <button onClick={regsiter} className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-[#722F37] text-white text-lg font-bold">Sign up</button>
          </div>
          
          
          <div className='flex mt-5 justify-center space-x-1'>
            <p>Already have an account? </p>
            <Link to="/login" className='text-green-700 hover:text-green-500 hover:underline cursor-pointer'>Login</Link>
          </div>
        </div>
      </div>
    </div>
 
  )
     
  }
