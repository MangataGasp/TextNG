import React, { use } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import SignupPage from './components/SIgnupPage'
import LoginPage from './components/LoginPage'
import Chat from './Chat'


const App = () => {

  const token = localStorage.getItem('token')
  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to='/chat' /> : <Navigate to='login' />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/chat' element={<Chat /> }/>
      </Routes>
     </BrowserRouter>
     
    </div>
  )
}

export default App
