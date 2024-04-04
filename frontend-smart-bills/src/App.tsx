import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Setting from './components/Setting/Setting';
function App() {
  return (
    <div className="App h-screen m-0">
      <Routes>
        <Route path="" element={<Layout/>}>
        <Route path="login"element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='setting' element={<Setting/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
