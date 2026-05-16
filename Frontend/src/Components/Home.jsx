import React from "react";
import graduationIllustration from "../assets/img/graduation_illustration.svg";
import connectingTeamsIllustration from "../assets/img/connecting_teams.svg";


function Home() {
  return (
    <div className="h-auto">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Alumni Hub</h1>
          <p className="text-lg max-w-2xl mx-auto">
            A platform to **connect**, **collaborate**, and **grow** with fellow alumni. Stay updated on job
            opportunities, events, and networking possibilities.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
            Join Now
          </button>
        </div>
      </header>

      {/* Features Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature Text Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Why Join Alumni Hub?</h2>
            <p className="text-lg text-gray-600">
              Alumni Hub is designed to bring together graduates, faculty, and industry professionals under one
              platform. Here’s what you can do:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li><span className="font-semibold">🔗 Connect:</span> Find and reconnect with your classmates and seniors.</li>
              <li><span className="font-semibold">💼 Jobs & Internships:</span> Access exclusive career opportunities.</li>
              <li><span className="font-semibold">📅 Events & Meetups:</span> Stay updated on alumni gatherings and workshops.</li>
              <li><span className="font-semibold">💬 Community Forum:</span> Engage in discussions, mentorship, and collaborations.</li>
              <li><span className="font-semibold">📚 Resources:</span> Access study materials, research papers, and career advice.</li>
            </ul>
          </div>

          {/* Feature Image Section */}
          
        </div>
      </main>

      {/* Alumni Testimonials */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Alumni Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">"Alumni Hub helped me land my first job through alumni referrals. A great platform!"</p>
              <p className="mt-4 font-semibold text-blue-600">- John Doe, Google</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">"Reconnecting with batchmates and getting career guidance was amazing!"</p>
              <p className="mt-4 font-semibold text-blue-600">- Sarah Lee, Amazon</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">"The job postings and mentorship opportunities here are invaluable!"</p>
              <p className="mt-4 font-semibold text-blue-600">- Michael Smith, Tesla</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Ready to Connect?</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Join thousands of alumni and grow your professional network today!
        </p>
        <button className="mt-6 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
          Sign Up Now
        </button>
      </section>
    </div>
  );
}

export default Home;
