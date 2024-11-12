import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { FaInfoCircle, FaLocationArrow } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "axios";
import { IoIosContact } from "react-icons/io";

function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const getApplication = async () => {
    try {
      const res = await axios.get("http://localhost:5001/job/applications", {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setApplications(res.data);
      console.log(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getApplication();
  }, []);

  return (
    <div className="h-lvh">
      <Nav />
      <div className=" h-full w-1/2 m-auto border-2 flex flex-col py-20">
        <h1 className="text-center text-xl font-bold my-3">
          {applications?.length} Jobs
        </h1>
        {applications?.map((el) => {
          return (
            <>
              <div
                id={el._id}
                className=" border-2 p-3 flex flex-col justify-between gap-5 "
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
                  <div className="flex gap-1 items-center">
                    <IoIosContact />
                    <span className="text-sm "> {el?.comapnyEmail}</span>
                  </div>
                </div>
                <span className="text-sm flex gap-1 items-center ">
                  <FaInfoCircle />
                  <span className=" text-red-600">
                    The Company will reach out to you for futher process
                  </span>
                </span>
                {/* <div className="flex items-center gap-2">
                <span>
                  <MdAccessTimeFilled />{" "}
                </span>
                <span className="text-sm ">1 week ago</span>
              </div> */}

                {/* <div className="w-1/6 text-center text-white bg-blue-400 rounded-md flex items-center justify-center h-8 cursor-pointer text-sm">
                  Chat
                </div> */}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default AppliedJobs;
