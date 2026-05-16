import { useEffect, useState } from "react";

const Events = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        location: "",
        category: "",
        description: "",
        organizer: "",
    });

    // ✅ Get user info from localStorage (Debugging added)
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    console.log("User Data:", user); // Debugging: Check user data in console

    // ✅ Only allow "Alumni" to add events
    const isAlumni = user && user.role === "Alumni";

    useEffect(() => {
        fetch("http://localhost:5000/api/events/all")
            .then((res) => res.json())
            .then((data) => {
                setUpcomingEvents(data.upcomingEvents);
                setPastEvents(data.pastEvents);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleAddEvent = async (e) => {
        e.preventDefault();

        if (!isAlumni) {
            alert("Only alumni can add events!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/events/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                const addedEvent = await response.json();

                // ✅ Update upcoming events list immediately
                setUpcomingEvents((prevEvents) => [...prevEvents, addedEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));

                // ✅ Clear form after submission
                setNewEvent({ title: "", date: "", location: "", category: "", description: "", organizer: "" });
                setShowForm(false);

                alert("Event added successfully!");
            } else {
                alert("Failed to add event");
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Form Card at the Top */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>

                {/* 🛠 Always show button if user exists, debug isAlumni */}
                {user ? (
                    isAlumni ? (
                        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                            {showForm ? "Close Form" : "Add Event"}
                        </button>
                    ) : (
                        <p className="text-red-500 font-semibold">Only alumni can add events.</p>
                    )
                ) : (
                    <p className="text-gray-500">Login to add events.</p>
                )}

                {showForm && isAlumni && (
                    <form onSubmit={handleAddEvent} className="mt-4 bg-gray-50 p-4 rounded-lg shadow-md">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Title" className="p-2 border rounded" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                            <input type="date" className="p-2 border rounded" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
                            <input type="text" placeholder="Location" className="p-2 border rounded" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
                            <input type="text" placeholder="Category" className="p-2 border rounded" value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} required />
                            <input type="text" placeholder="Organizer" className="p-2 border rounded" value={newEvent.organizer} onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })} required />
                        </div>
                        <textarea placeholder="Description" className="w-full p-2 border rounded mt-2" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required></textarea>
                        <button type="submit" className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Submit Event</button>
                    </form>
                )}
            </div>

            {/* Event List Below */}
            <ul className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-bold mb-3">Upcoming Events</h3>
                {upcomingEvents.length === 0 ? (
                    <p className="text-gray-500">No upcoming events</p>
                ) : (
                    upcomingEvents.map((event) => (
                        <li key={event._id} className="p-3 border-b">
                            <h3 className="font-semibold">{event.title}</h3>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                            <p className="text-gray-600">{event.location}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Events;
