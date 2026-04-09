import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { GrLinkNext } from "react-icons/gr";
import Loader from "./components/Loader";

const App = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BASE_URL

  const fetchMessage = async () => {
    try {
      const res = await axios.get(`${API_URL}/messages`);
      setMessage(res.data);
    } catch (err) {
      console.log("Error fetching API", err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const handleSubmit = async () => {
    if (!text) return;
    try {
      await axios.post(`${API_URL}/messages`, {
        text: text,
        user: "You", //replaced this with my name for anyone who wants to test it
      });
      setText("");
      await fetchMessage();
    } catch (err) {
      console.error("There was an error", err);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="border rounded-lg w-[320px] h-125 bg-white flex flex-col shadow-md">
    
    {/* Header */}
    <div className="border-b px-4 py-3 font-semibold">
      TEXTNG
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {loading ? (
      <Loader />
    ) : (
      message.map((msg, index) => (
        <div key={msg.id ?? index} className=" justify-start">
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

export default App;
