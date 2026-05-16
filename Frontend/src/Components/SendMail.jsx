import React, { useState } from "react";
import { FaShare } from "react-icons/fa";
import Select from "react-select";
import { getLoggedIn } from "../services/authService";
import { Link } from "react-router-dom";

const collegeOptions = [
  { value: "rmk", label: "RMK Engineering College" },
  { value: "ssn", label: "SSN College of Engineering" },
  { value: "vit", label: "VIT University" },
  { value: "anna", label: "Anna University" },
];

const batchOptions = [
  { value: "2020", label: "Batch 2020" },
  { value: "2021", label: "Batch 2021" },
  { value: "2022", label: "Batch 2022" },
  { value: "2023", label: "Batch 2023" },
];

const branchOptions = [
  { value: "cse", label: "Computer Science" },
  { value: "ece", label: "Electronics & Communication" },
  { value: "eee", label: "Electrical & Electronics" },
  { value: "mech", label: "Mechanical Engineering" },
];

const SendMail = () => {
  const loggedIn = getLoggedIn();
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      college: selectedColleges.map((c) => c.value),
      batch: selectedBatches.map((b) => b.value),
      branch: selectedBranches.map((br) => br.value),
      subject,
      message,
    };

    try {
      const response = await fetch("http://localhost:8080/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        {loggedIn ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="px-8 pt-6 pb-8 mb-4">
              <h2 className="my-3 text-2xl font-bold mb-4 text-center">
                Send Mail to Alumni
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  College Name
                </label>
                <Select
                  options={collegeOptions}
                  isMulti
                  isSearchable
                  placeholder="Select Colleges .."
                  value={selectedColleges}
                  onChange={setSelectedColleges}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Batch
                </label>
                <Select
                  options={batchOptions}
                  isMulti
                  isSearchable
                  placeholder="Select Batch .."
                  value={selectedBatches}
                  onChange={setSelectedBatches}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Branch
                </label>
                <Select
                  options={branchOptions}
                  isMulti
                  isSearchable
                  placeholder="Select Branch .."
                  value={selectedBranches}
                  onChange={setSelectedBranches}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Subject
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  required
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Mail
                  <FaShare className="inline-block ml-2 mt-1" />
                </button>
              </div>
            </div>
          </form>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default SendMail;
