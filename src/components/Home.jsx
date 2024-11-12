import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Select, Slider, message } from "antd";
import { FaLocationArrow } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdAccessTimeFilled } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Jobs, setJobs] = useState([]);
  const getJobs = async () => {
    const res = await axios.get("http://localhost:5001/job/jobs/not-applied", {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    setSearchResults(res.data);
    setJobs(res.data);
    return res;
  };
  useEffect(() => {
    getJobs();
  }, []);
  const applyJob = async (id) => {
    try {
      await axios.post(
        `http://localhost:5001/job/apply/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      getJobs();
      message.success("Job Applied Sucessfully!");
    } catch (error) {
      message.warning(error);
    }
  };
  const formatNumberWithIndianCommas = (number) => {
    const numStr = number.toString().split(".");
    let lastThree = numStr[0].substring(numStr[0].length - 3);
    const otherNumbers = numStr[0].substring(0, numStr[0].length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    const formatted =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return numStr.length > 1 ? formatted + "." + numStr[1] : formatted;
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
      <div className=" h-full w-1/2 m-auto border-2 flex ">
        {/* <div className="h-full w-1/3 border-2 py-40 flex flex-col gap-5 px-2 ">
          <h1 className="text-lg font-medium text-center ">Filter</h1>
          <label className="font-sm ">Profile</label>
          <Select
            defaultValue="lucy"
            style={{ width: "100%", height: "40px" }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
          <label className="font-sm ">Loaction</label>
          <Select
            defaultValue="lucy"
            style={{ width: "100%", height: "40px" }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
          <label className="font-sm ">Salary</label>
          <Slider min={1} max={20} onChange={onChange} value={inputValue} />
        </div> */}
        <div className="h-full w-full py-20 flex flex-col  px-2 ">
          <h1 className="text-center text-xl font-bold">
            {searchResults?.length} Jobs
          </h1>
          <input
            type="text"
            className="border-2 rounded-sm h-10 px-2 py-2"
            placeholder="Search here... "
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchResults?.map((el) => {
            return (
              <>
                <div
                  id={el._id}
                  className=" border-2 p-3 flex flex-col justify-between gap-5 my-2 "
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
                      <span className="text-sm ">
                        {" "}
                        {formatNumberWithIndianCommas(el?.salary)}
                      </span>
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
                      <div
                        onClick={() => applyJob(el._id)}
                        className="w-1/6 text-center text-white bg-green-400 rounded-md flex items-center justify-center h-8 cursor-pointer text-sm"
                      >
                        Apply
                      </div>
                      {/* <div
                        onClick={() => {
                          navigate("/chats");
                        }}
                        className="w-1/6 text-center text-white bg-blue-400 rounded-md flex items-center justify-center h-8 cursor-pointer text-sm"
                      >
                        Chat
                      </div> */}
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
    </div>
  );
}

export default Home;
