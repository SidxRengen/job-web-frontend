import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { FaLocationArrow } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdAccessTimeFilled } from "react-icons/md";
import { message } from "antd";

function Company() {
  const [info, setInfo] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Jobs, setJobs] = useState([]);
  const getJobs = async () => {
    const res = await axios.get("https://job-web-backend-1.onrender.com/job/jobs");
    setJobs(res.data);
    console.log(res.data);
    return res;
  };
  useEffect(() => {
    function parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
    setInfo(parseJwt(localStorage.getItem("token")));
    getJobs();
  }, []);
  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/job/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      message.success("job deleted sucessfully!");
      getJobs();
    } catch (error) {
      message.warning(error);
    }
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredJobs = Jobs.filter(
      (job) =>
        job?.title.toLowerCase().includes(value.toLowerCase()) ||
        job.description.toLowerCase().includes(value.toLowerCase()) ||
        job.location.toLowerCase().includes(value.toLowerCase()) ||
        job.company.toLowerCase().includes(value.toLowerCase())
      // job.salary.includes(value)
    );
    setSearchResults(filteredJobs);
  };
  return (
    <div className="h-lvh">
      <Nav />
      <div className=" h-full w-1/2 m-auto border-2 flex flex-col py-20">
        <h1 className="text-center text-xl font-bold my-3">
          {
            Jobs?.filter((el) => {
              return el.companyId === info._id;
            }).length
          }{" "}
          Jobs
        </h1>
        {/* <input
            type="text"
            className="border-2 rounded-sm h-10 px-2"
            placeholder="Search here... "
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          /> */}
        {Jobs?.filter((el) => {
          return el.companyId === info._id;
        })?.map((el) => {
          return (
            <>
              <div
                id={el._id}
                className=" border-2 p-3 flex flex-col justify-between gap-5 my-2"
              >
                <span className=" font-medium">{el?.title} </span>
                <span className=" text-sm font-light">{el?.company}</span>
                <span className=" text-sm font-light">{el?.description}</span>
                <div className="flex items-center gap-10">
                  <div className="flex gap-2 items-center">
                    <FaLocationArrow />
                    <span className="text-sm "> {el?.location}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <RiMoneyRupeeCircleFill />
                    <span className="text-sm "> {el?.salary}</span>
                  </div>
                </div>
                {/* <div className="flex items-center gap-2">
                  <span>
                    <MdAccessTimeFilled />{" "}
                  </span>
                  <span className="text-sm ">1 week ago</span>
                </div> */}
                {localStorage.getItem("type") === "user" ? (
                  <div className="flex gap-2">
                    <div className="w-1/6 text-center text-white bg-green-400 rounded-md flex items-center justify-center h-8 cursor-pointer text-sm">
                      Apply
                    </div>
                    <div className="w-1/6 text-center text-white bg-blue-400 rounded-md flex items-center justify-center h-8 cursor-pointer text-sm">
                      Chat
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => deleteJob(el._id)}
                    className="w-1/6 text-center text-white bg-red-400 rounded-md flex items-center justify-center h-8 cursor-pointer text-sm"
                  >
                    Delete
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Company;
