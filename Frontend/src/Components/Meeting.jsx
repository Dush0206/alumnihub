import React, { useState, useEffect } from "react";
import { getLoggedIn, getUserRole } from "../services/authService";
import { Link } from "react-router-dom";

const MeetingPage = () => {
  const loggedIn = getLoggedIn();
  const userRole = getUserRole(); // Assume 'alumni' or 'admin'

  const [meetingLink, setMeetingLink] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetings, setMeetings] = useState([]);

  // Load meetings from local storage when the component mounts
  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(storedMeetings);
  }, []);

  const handleGenerateMeetingLink = () => {
    const newMeetingLink = `https://meet.jit.si/${Math.random()
      .toString(36)
      .substring(7)}`;
    setMeetingLink(newMeetingLink);
  };

  const handleAddMeeting = () => {
    if (!meetingTitle || !meetingDate || !meetingTime || !meetingLink) {
      alert("Please fill in all details");
      return;
    }
    const newMeeting = {
      title: meetingTitle,
      date: meetingDate,
      time: meetingTime,
      description: meetingDescription,
      link: meetingLink,
    };

    const updatedMeetings = [...meetings, newMeeting];
    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings)); // Save to local storage

    setMeetingTitle("");
    setMeetingDate("");
    setMeetingTime("");
    setMeetingDescription("");
    setMeetingLink("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      {loggedIn ? (
        userRole === "alumni" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Schedule a Meeting</h2>

            <input
              type="text"
              placeholder="Meeting Title"
              className="w-full p-2 border rounded mb-2"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            />

            <input
              type="date"
              className="w-full p-2 border rounded mb-2"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
            />

            <input
              type="time"
              className="w-full p-2 border rounded mb-2"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
            />

            <textarea
              placeholder="Meeting Description"
              className="w-full p-2 border rounded mb-2"
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
            />

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md mb-2"
              onClick={handleGenerateMeetingLink}
            >
              Generate Meeting Link
            </button>

            {meetingLink && (
              <div className="mb-2">
                <p className="text-green-600">Meeting Link Generated:</p>
                <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                  {meetingLink}
                </a>
              </div>
            )}

            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={handleAddMeeting}
            >
              Add Meeting
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Scheduled Meetings</h2>
            {meetings.length === 0 ? (
              <p>No meetings scheduled.</p>
            ) : (
              meetings.map((meet, index) => (
                <div key={index} className="border p-4 rounded mb-2">
                  <h3 className="text-xl font-bold">{meet.title}</h3>
                  <p>Date: {meet.date}</p>
                  <p>Time: {meet.time}</p>
                  <p>Description: {meet.description}</p>
                  <a
                    href={meet.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Join Meeting
                  </a>
                </div>
              ))
            )}
          </div>
        )
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">You're Not Logged In</h1>
          <p className="text-gray-600 mb-4">Please log in to access the meeting page.</p>
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default MeetingPage;
