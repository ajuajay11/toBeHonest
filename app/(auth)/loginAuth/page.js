'use client'
 import axios from "axios";
import { useState } from "react";
import Cookies from 'js-cookie';

export default function Register() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const handleSubmit= async (e)=> {
    e.preventDefault();
    try {
      const response = await axios.post(`https://to-be-honest.vercel.app/api/user/login/`, loginData);
      console.log(response);
      if (response) {
        Cookies.set('token', response.data.user.token, { expires: 12 });
        Cookies.set('isAuthenticated', true, { expires: 12 });
      } 
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onClick={handleSubmit}>
        <input className="form-control" value={loginData.email} onChange={(e)=>setLoginData({...loginData, email:e.target.value})} placeholder="enter your email" type="email" required id="email" />
        <input className="form-control" value={loginData.password} onChange={(e)=>setLoginData({...loginData, password:e.target.value})} placeholder="enter your password" type="email" required id="password" />
        <button className="button btn-primary mt-3">Submit</button>
      </form>
    </>
  )
}