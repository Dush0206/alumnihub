import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../services/authService";

const AdminPanel = () => {
  const { adminName } = getUserData(); // Fetch admin details
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/events")
        .then((res) => res.json())
        .then((data) => setEvents(data))
        .catch((err) => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        
        const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer YOUR_ADMIN_TOKEN" }
        });

        if (response.ok) {
        alert("Event deleted!");
        setEvents(events.filter(event => event._id !== id));
        } else {
        alert("Failed to delete event");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Welcome, {adminName}! 👋
        </h1>

        {/* Navigation Links */}
        <div className="flex justify-center gap-4 mb-8">
            <Link to="/events" className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
            View Events
            </Link>
            <Link to="/jobs" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            Manage Jobs
            </Link>
        </div>

        {/* Event Management Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Management</h2>
            
            {/* List of Events */}
            <ul className="space-y-4">
            {events.map((event) => (
                <li key={event._id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-gray-500">{event.location}</p>
                </div>
                <button 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(event._id)}
                >
                    Delete
                </button>
                </li>
            ))}
            </ul>

            {/* Add Event Button */}
            <div className="mt-6 text-center">
            <Link to="/events" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                + Add New Event
            </Link>
            </div>
        </div>
        </div>
    );
    };

    export default AdminPanel;
