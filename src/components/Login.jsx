import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState(true);
  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });
  const [signUpCreds, setSignUpCreds] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState(true);
  const [company, setComapny] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      if (company) {
        const response = await axios.post(
          "https://job-web-backend-1.onrender.com/user/company/login",
          loginCreds
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        message.success("Login Sucessfully!");
        localStorage.setItem("type", "company");
        navigate("/company/home");
      } else {
        const response = await axios.post(
          "https://job-web-backend-1.onrender.com/user/login",
          loginCreds
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        message.success("Login Sucessfully!");
        localStorage.setItem("type", "user");
        navigate("/home");
      }
    } catch (err) {
      message.warning("Incorrect Email or Password");
    }
  };
  const handleSignUp = async (e) => {
    try {
      if (company) {
        const response = await axios.post(
          "https://job-web-backend-1.onrender.com/user/company/register",
          signUpCreds
        );
        message.success("Comapny Account Created Sucessfully!");
        setLogin(true);
      } else {
        const response = await axios.post(
          "https://job-web-backend-1.onrender.com/user/register",
          signUpCreds
        );
        setLogin(true);
        message.success("User Account Created Sucessfully!");
      }
    } catch (err) {
      message.warning(err);
    }
  };
  const handleChanged = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
    setSignUpCreds({ ...signUpCreds, [e.target.name]: e.target.value });
  };
  console.log(company);
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="login h-lvh w-lvw flex justify-center items-center">
      <div className="login-box h-1/2 w-1/3 flex flex-col border-2 px-5 py-5 rounded-md justify-around shadow-blue-400 shadow-md	">
        {!login && (
          <>
            <input
              type="text"
              name="username"
              value={signUpCreds.username}
              placeholder="Enter Your Name "
              required
              onChange={(e) => {
                handleChanged(e);
              }}
              className=" border-2 rounded-sm h-10 px-2"
            />
          </>
        )}
        <input
          type="email"
          required
          name="email"
          value={login ? loginCreds.email : signUpCreds.email}
          onChange={(e) => {
            handleChanged(e);
          }}
          placeholder="Enter Your Email "
          className=" border-2 rounded-sm h-10 px-2"
        />
        <input
          placeholder="Enter Your Password "
          type="password"
          name="password"
          required
          onChange={(e) => {
            handleChanged(e);
          }}
          value={login ? loginCreds.password : signUpCreds.password}
          className=" border-2 rounded-sm h-10 px-2"
        />
        <div className="flex justify-around items-center ">
          <div className=" flex flex-col items-center justify-center gap-2">
            <span className=" font-bold text-blue-400">User</span>
            <input
              type="radio"
              name="user"
              checked={user}
              onChange={(e) => {
                setUser(e.target.checked);
                setComapny(!e.target.checked);
              }}
            />
          </div>
          <div className=" flex flex-col items-center justify-center gap-2">
            <span className=" font-bold text-blue-400">Comapany</span>
            <input
              type="radio"
              name="company"
              checked={company}
              onChange={(e) => {
                setUser(!e.target.checked);
                setComapny(e.target.checked);
              }}
            />
          </div>
        </div>
        <div className="login-buttons flex gap-4 ">
          <div
            className={
              login
                ? "w-1/2 text-center border-blue-400 border-2 rounded-md flex items-center justify-center h-10 cursor-pointer"
                : "w-1/2 text-center text-white bg-blue-400 rounded-md flex items-center justify-center h-10 cursor-pointer"
            }
            onClick={() => {
              setLogin(false), !login && handleSignUp();
            }}
          >
            Sign-Up
          </div>
          <div
            onClick={() => {
              setLogin(true), login && handleLogin();
            }}
            className={
              login
                ? "w-1/2 text-center text-white bg-blue-400 rounded-md flex items-center justify-center h-10 cursor-pointer"
                : "w-1/2 text-center border-blue-400 border-2 rounded-md flex items-center justify-center h-10 cursor-pointer"
            }
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
