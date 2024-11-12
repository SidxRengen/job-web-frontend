import React from "react";
import { CiLogout } from "react-icons/ci";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoCheckboxSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";

function Nav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    message.success("Logged out successfully");
  };
  return (
    <div className="flex w-full py-2 border-2 shadow-md justify-between items-center px-5 fixed bg-white ">
      <h1
        className=" font-bold text-2xl text-blue-400 cursor-pointer"
        onClick={() => {
          localStorage.getItem("type") === "user"
            ? navigate("/home")
            : navigate("/company/home");
        }}
      >
        Job-Port
      </h1>
      <div className="flex h-full items-center gap-5 justify-between ">
        {localStorage.getItem("type") === "user" && (
          <span
            className="font-medium flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/applications");
            }}
          >
            <IoCheckboxSharp />
            My Jobs
          </span>
        )}
        {localStorage.getItem("type") === "company" && (
          <span
            className=" font-medium flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/company/job");
            }}
          >
            <IoIosCreate />
            Create Job
          </span>
        )}
        {/* <span className=" font-medium flex items-center gap-2 cursor-pointer">
          <IoChatbubbleEllipses /> Chat
        </span> */}
        <span
          className=" font-medium flex items-center gap-2 cursor-pointer"
          onClick={handleLogout}
        >
          <CiLogout /> Log Out
        </span>
      </div>
    </div>
  );
}

export default Nav;
