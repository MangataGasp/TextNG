import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { GrLinkNext } from "react-icons/gr";
import Loader from "./components/Loader";
import SignupPage from "./components/SIgnupPage";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_BASE_URL

  const navigate = useNavigate()

    const token = localStorage.getItem('token')
  const fetchMessage = async () => {
    
    try {
      const res = await axios.get(`${API_URL}/messages`, 
        {headers: { Authorization: `Bearer ${token}` }});
      setMessage(res.data);
      
    } catch (err) {
      console.log("Error fetching API", err);
      setError("Error fetching messages")
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
        navigate('/login')

    }
    fetchMessage();
  }, []);

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    window.location.reload()
    navigate('/login')
  }

  const handleSubmit = async () => {
    if (!text) return;
    try {
      await axios.post(`${API_URL}/messages`, {
        text: text,
        user: "You" 
       //replaced this with my name for anyone who wants to test it
      },
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
      setText("");
      await fetchMessage();
    } catch (err) {
      console.error("There was an error", err);
      setError("retry again, something occured")
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="border rounded-lg w-[320px] h-125 bg-white flex flex-col shadow-md">
    
    {/* Header */}
    <div className="border-b flex justify-between px-4 py-3 font-semibold">
      <p>TEXTNG</p>
      <button onClick={logout} className="cursor-pointer">Logout</button>
    </div>
  
    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {loading ? (
      <Loader />
    ) : (
      message.map((msg) => (
        <div key={msg.id} className=" justify-start">
          <p>{msg.sender}</p>
          <div className="bg-gray-200 rounded-full px-4 py-2 w-fit max-w-[80%]">
            <p className="text-sm">{msg.text}</p>
          </div>
        </div>
    ))
      )}
    </div>


    {/* Input */}
    <div className="border-t p-2 flex items-center gap-2">
      <input
        type="text"
        placeholder="Say something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-full px-4 py-2 outline-none text-sm"
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white p-2 rounded-full"
      >
        <GrLinkNext />
      </button>
    </div>
    
  </div>

</div>
  );
}

export default Chat;