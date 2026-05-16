import { Navigate, Link } from "react-router-dom";
import { getUserData, getLoggedIn } from "../services/authService";

function Home() {
  const loggedin = getLoggedIn();
  if (!loggedin) return <Navigate to="/login" />;

  const { role, email, firstName, adminName,alumniName } = getUserData();
  const displayName = role === "admin" ? adminName : firstName;
  const realname = role ==="alumni"? alumniName:firstName;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Hero Section */}
      <h1 className="text-5xl font-extrabold text-blue-600 mb-2">Welcome, {realname}!</h1>
      <h2 className="text-xl text-gray-700 mb-6">
        {role === "admin" ? "Manage the platform efficiently." : "Explore opportunities and connect with alumni."}
      </h2>

      {/* User Info Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Profile</h3>
        <p className="text-lg"><strong>Name:</strong> {displayName}</p>
        <p className="text-lg"><strong>Email:</strong> {email}</p>
        <p className="text-lg"><strong>Role:</strong> {role}</p>
      </div>

      {/* Quick Navigation */}
      <div className="flex flex-wrap gap-4 mt-6">
        <Link to="/jobs" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          View Jobs
        </Link>
        <Link to="/events" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
          Explore Events
        </Link>
        {role === "admin" && (
          <Link to="/admin" className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
            Admin Panel
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
