import React, { useState, useEffect } from "react";
import { getLoggedIn, getUserData } from "../services/authService";
import NotLoggedIn from "./helper/NotLoggedIn";

function Jobs() {
  const loggedIn = getLoggedIn();
  const { role, username } = getUserData(); // Get user role & username

  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState({}); // Store resumes per job

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);

    const savedResumes = JSON.parse(localStorage.getItem("resumes")) || {};
    setResumes(savedResumes);
  }, []);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    description: "",
    applyLink: "",
  });

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handlePostJob = () => {
    if (!newJob.title || !newJob.company || !newJob.description || !newJob.applyLink) {
      alert("Please fill in all fields.");
      return;
    }
    const updatedJobs = [...jobs, { ...newJob, postedBy: username }];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setNewJob({ title: "", company: "", description: "", applyLink: "" });
  };

  const handleUploadResume = (jobIndex, file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const updatedResumes = { ...resumes, [jobIndex]: { file: reader.result, status: "pending" } };
      setResumes(updatedResumes);
      localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    };
  };

  const handleAcceptResume = (jobIndex) => {
    const updatedResumes = { ...resumes, [jobIndex]: { ...resumes[jobIndex], status: "accepted" } };
    setResumes(updatedResumes);
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
  };

  const handleDeleteResume = (jobIndex) => {
    const updatedResumes = { ...resumes };
    delete updatedResumes[jobIndex];
    setResumes(updatedResumes);
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loggedIn ? (
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-6 text-center">Job Referrals</h1>

          {role === "alumni" && (
            <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
              <input type="text" name="title" placeholder="Job Title" value={newJob.title} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <input type="text" name="company" placeholder="Company Name" value={newJob.company} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <textarea name="description" placeholder="Job Description" value={newJob.description} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <input type="text" name="applyLink" placeholder="Application Link" value={newJob.applyLink} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <button onClick={handlePostJob} className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition">Post Job</button>
            </div>
          )}

          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div key={index} className="bg-white p-4 shadow rounded-lg">
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-700 mt-2">{job.description}</p>

                  {role === "admin" && !resumes[index] && (
                    <>
                      <input type="file" accept=".pdf" onChange={(e) => handleUploadResume(index, e.target.files[0])} className="mt-3" />
                      <p className="text-red-500 text-sm">Upload your resume for alumni review.</p>
                    </>
                  )}

                  {resumes[index] && (
                    <div className="mt-3 p-2 bg-gray-200 rounded">
                      <p className="text-sm font-semibold">Resume Status: {resumes[index].status}</p>
                      <a href={resumes[index].file} download={`resume-${index}.pdf`} className="text-blue-500 underline">Download Resume</a>
                      {role === "alumni" && (
                        <div className="mt-2">
                          <button onClick={() => handleAcceptResume(index)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Accept</button>
                          <button onClick={() => handleDeleteResume(index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                        </div>
                      )}
                    </div>
                  )}

                  {resumes[index]?.status === "accepted" && role === "admin" && (
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block px-4 py-2 font-semibold rounded transition bg-green-500 text-white hover:bg-green-600"
                    >
                      Apply Now
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No job postings yet.</p>
            )}
          </div>
        </div>
      ) : (
        <NotLoggedIn text="Jobs" />
      )}
    </div>
  );
}

export default Jobs;