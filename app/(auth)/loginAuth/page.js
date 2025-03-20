'use client';
import axios from "axios";
import { useState } from "react";
import Cookies from 'js-cookie';

export default function Register() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/user/login/`,
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.user.token) {
        Cookies.set('token', response.data.user.token, { expires: 12 });
        Cookies.set('isAuthenticated', true, { expires: 12 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          placeholder="Enter your email"
          type="email"
          required
          id="email"
        />
        <input
          className="form-control"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          placeholder="Enter your password"
          type="password"
          required
          id="password"
        />
        <button type="submit" className="button btn-primary mt-3">
          Submit
        </button>
      </form>
    </>
  );
}