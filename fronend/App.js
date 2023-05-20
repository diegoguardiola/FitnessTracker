import { BrowserRouter, Routes, Route } from 'react-router-dom'

// views & components

import Login from './views/Login'
import Signup from './views/SignUp'
import Navbar from './components/navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="views">
          <Routes>

            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;