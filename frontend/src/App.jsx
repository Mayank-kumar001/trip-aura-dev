import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeComponent from './components/HomeComponent'
import TripauraAgentComponent from './components/TripauraAgentComponent'





function App() {

  return (
    <div className='min-h-screen'>


      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/agent" element={<TripauraAgentComponent />} />
      </Routes>

    </div>
  )
}

export default App