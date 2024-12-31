import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './pages/Tasks'
import Add from './pages/Add'

function App() {
  // Assuming you might have user authentication state here
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // You could check the user's authentication status on mount
  useEffect(() => {
    // Example: Check if the user is authenticated, set accordingly
    const user = localStorage.getItem('user'); // Replace with your auth check logic
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Auth insideRegister={true} />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/:id/tasks" element={<Tasks />} />
         
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App