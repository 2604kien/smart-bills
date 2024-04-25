import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Setting from './components/Setting/Setting';
import New from './components/New/New';
import Bill from './components/Bill/Bill';
import Home from './components/Home/Home';
import Friend from './components/Friend/Friend';
import AddBill from './components/Bill/AddBill';
import FriendLayout from './components/Friend/FriendLayout';
import AddFriend from './components/Friend/AddFriend';
import ViewOweBill from './components/Bill/ViewOweBill';
import BillCard from './components/Layout/BillCard';
import ViewPaidBill from './components/Bill/ViewPaidBill';
import CreatedBill from './components/Bill/CreatedBill';
function App() {
  return (
    <div className="App h-screen m-0" >
      <Routes>
        <Route path="" element={<Layout/>}>
          <Route path='' element={<Home/>}/>
          <Route path="login"element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='setting' element={<Setting/>}/>
          <Route path='news' element={<New/>}/>
          <Route path='bill' element={<BillCard/>}>
            <Route path='' element={<Bill/>}/>
            <Route path='new' element={<AddBill/>}/>
            <Route path='owe' element={<ViewOweBill/>}/>
            <Route path='paid' element={<ViewPaidBill/>}/>
            <Route path='created' element={<CreatedBill/>}/>
          </Route>
          <Route path="friend" element={<FriendLayout/>}>
            <Route path='' element={<Friend/>}/>
            <Route path='new' element={<AddFriend/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
