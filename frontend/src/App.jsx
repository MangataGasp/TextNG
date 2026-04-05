import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


const App = () => {
  const [text, setText] = useState('')
  const [message, setMessage] = useState([])
  const [loading, setLoading] = useState(false)
  const BASE_URL = "http://localhost:6500"

  const fetchMessage = async () => {
        try{
          const res = await axios.get(`${BASE_URL}/messages`)
          setMessage(res.data)
          setLoading(false)
        } catch (err) {
          console.log("Error fetching API", err)
        }
      } 

      useEffect(() => {
      fetchMessage()
    }, []) 

    const handleSubmit = async () => {
        try {
   
             await axios.post(`${BASE_URL}/messages`, {
              text: text,
              user: "Muhammad",
             })
        setText("")
        await fetchMessage();
            } 
        catch (err) {
            console.error("There was an error", err)
        }
    }

    if(!message) return (
      <div>Loading.....</div>
    )
  return (
    <div>
      <div className="min-h-screen bg-[#0d0a06] flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-170 flex flex-col bg-[#14100a] rounded-3xl border border-amber-700/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden">

       
          <p>POST</p>
          {message.map((msg, index) => (
                  <div key={msg.id ?? index}>
                    <p className='text-white'> {msg.text}</p>
                  </div>
                ))}
                
          {/* Typing indicator */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-amber-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
              A
            </div>
            <div className="bg-white/5 border border-amber-700/20 rounded-[20px_20px_20px_4px] px-4 py-3 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-600 opacity-60" />
              <div className="w-2 h-2 rounded-full bg-amber-600 opacity-80" />
              <div className="w-2 h-2 rounded-full bg-amber-600" />
            </div>
          </div>

        </div>

        {/* Input */}
        <div className="px-4 pt-3 pb-5 border-t border-amber-700/10">
          <div className="flex items-center gap-2 bg-white/4 border border-amber-700/15 rounded-2xl px-4 py-2.5">
            <input
              type="text"
              placeholder="Say something..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 bg-transparent text-amber-100/80 text-sm placeholder-amber-700/35 outline-none"
            />
            <button onClick={handleSubmit}>
              S
            </button>
          </div>
          <p className="text-center mt-2.5 text-[10px] text-amber-700/20 font-mono tracking-widest uppercase">
            Shift + Enter for new line
          </p>
        </div>

      </div>
    </div>

  )
}

export default App
