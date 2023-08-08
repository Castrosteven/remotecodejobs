"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
const Upload = () => {
  const [newJobFields, setNewJobFields] = useState({
    description: "",
    location: "",
    title: "",
  });

  return (
    <div className="p-4 flex container mx-auto">
      <form action="w-full">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            placeholder="Front End Engineer"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            placeholder="Remote"
            className="input input-bordered w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default Upload;
