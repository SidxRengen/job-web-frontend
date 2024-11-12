import React, { useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };
  const createJob = async () => {
    try {
      const res = await axios.post("http://localhost:5001/job/jobs", job, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      message.success("job created sucessfully!");
      navigate("/company/home");
    } catch (error) {
      message.warning(error);
    }
  };
  return (
    <div className="h-lvh">
      <Nav />
      <div className="  w-1/2 m-auto border-2 flex flex-col py-20 p-5 gap-5">
        <h1 className="text-center text-xl font-bold my-3">Create Job</h1>
        <label className="font-medium ">Profile</label>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={job.title}
          className=" border-2 rounded-sm h-10 px-2"
        />
        <label className="font-medium ">Description</label>
        <input
          type="text"
          onChange={handleChange}
          name="description"
          className=" border-2 rounded-sm h-10 px-2"
        />
        <label className="font-medium ">Loaction</label>
        <input
          type="text"
          onChange={handleChange}
          name="location"
          className=" border-2 rounded-sm h-10 px-2"
        />
        <label className="font-medium ">Salary per Annum</label>
        <input
          type="text"
          onChange={handleChange}
          name="salary"
          className=" border-2 rounded-sm h-10 px-2"
        />
        <div className="flex items-center gap-2 ">
          <div
            onClick={() => navigate("/company/home")}
            className="w-1/2 text-center text-white bg-red-400 rounded-md flex items-center justify-center h-10 cursor-pointer"
          >
            Cancel
          </div>
          <div
            onClick={createJob}
            className="w-1/2 text-center text-white bg-blue-400 rounded-md flex items-center justify-center h-10 cursor-pointer"
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;
