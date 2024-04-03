import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/User/Login';
import Register from './components/User/Register';
function App() {
  return (
    <div className="App h-screen m-0">
      <Routes>
        <Route path="" element={<Layout/>}>
        </Route>
        <Route path="login"element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
