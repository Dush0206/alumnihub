import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:8080");

const departments = ["CSBS", "CSE", "ECE", "CSD", "EEE", "AI/DS"];

const botReplies = {
    "hi": "hey there",
    "hello": "Hi there!",
    "how are you": "I'm good!",
    "what project should i do": "You can try Machine Learning, Web Development, or IoT projects!",
    "suggest a project": "How about a chatbot, a fitness tracker, or an AI-based assistant?",
    "bye": "Goodbye! Have a great day!",
};

const CommunityForum = () => {
    const [selectedDept, setSelectedDept] = useState(departments[0]);
    const [messages, setMessages] = useState({});
    const [input, setInput] = useState("");

    // Clear messages on refresh
    useEffect(() => {
        const handleBeforeUnload = () => {
            setMessages({});
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    useEffect(() => {
        // Fetch messages from backend when department changes
        axios.get(`http://localhost:8080/api/messages/${selectedDept}`)
            .then(res => setMessages(prev => ({
                ...prev,
                [selectedDept]: res.data
            })))
            .catch(err => console.log("Error fetching messages", err));
    }, [selectedDept]);

    useEffect(() => {
        // Listen for real-time messages
        socket.on("receiveMessage", (newMessage) => {
            setMessages(prev => ({
                ...prev,
                [newMessage.department]: [...(prev[newMessage.department] || []), newMessage]
            }));
        });

        return () => socket.off("receiveMessage");
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;
    
        const messageData = { sender: "You", message: input, department: selectedDept };
    
        // ✅ Update UI immediately
        setMessages(prev => ({
            ...prev,
            [selectedDept]: [...(prev[selectedDept] || []), messageData]
        }));
    
        try {
            // ✅ Store user message in the database
            await axios.post("http://localhost:8080/api/messages", messageData);
        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    
        // ✅ Send message to backend via WebSocket
        socket.emit("sendMessage", messageData);
        
        setInput(""); // Clear input field
    
        // 🔹 Bot replies based on predefined responses
        setTimeout(async () => {
            const lowerInput = input.toLowerCase();
            const botResponse = botReplies[lowerInput] || "I'm not sure, can you clarify?";
    
            const botReply = {
                sender: "Deepak CSBS",
                message: botResponse,
                department: selectedDept,
            };
    
            setMessages(prev => ({
                ...prev,
                [selectedDept]: [...(prev[selectedDept] || []), botReply]
            }));
    
            socket.emit("sendMessage", botReply);
    
            try {
                // ✅ Store bot reply in the database
                await axios.post("http://localhost:8080/api/messages", botReply);
            } catch (error) {
                console.error("❌ Error storing bot reply:", error);
            }
        }, 2000);
    };
    
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold mb-4">Departments</h2>
                {departments.map((dept) => (
                    <button key={dept} onClick={() => setSelectedDept(dept)} 
                        className={`block w-full py-2 px-4 text-left rounded-md ${selectedDept === dept ? "bg-gray-700" : "hover:bg-gray-600"}`}>
                        {dept}
                    </button>
                ))}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="bg-blue-600 text-white p-4 text-lg font-bold">{selectedDept} Forum</div>
                <div className="flex-1 p-4 overflow-y-auto bg-white space-y-2">
                    {(messages[selectedDept] || []).map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"} items-center space-x-2`}>
                            <FaUserCircle className="text-gray-500 text-xl" />
                            <p className={`p-2 rounded ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                                <strong>{msg.sender}:</strong> {msg.message}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-gray-200 flex">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type a message..." />
                    <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Send</button>
                </div>
            </div>
        </div>
    );
};

export default CommunityForum;
