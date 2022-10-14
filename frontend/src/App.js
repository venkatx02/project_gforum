import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState, createContext } from "react";
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Myprofile from "./Myprofile";
export const store = createContext();

function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
    <store.Provider value={[token, setToken]}>
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/register' element={< Register />}></Route>
      <Route path='/login' element={< Login />}></Route>
      <Route path='/dashboard' element={< Dashboard />}></Route>
      <Route path='/myprofile' element={< Myprofile />}></Route>

      </Routes>
    </BrowserRouter>
    </store.Provider>
    </div>
  );
}

export default App;
