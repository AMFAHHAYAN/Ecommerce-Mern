import React from "react";

const UserProfile = ({ handleLogout }) => {
  // Sample user data (Replace with actual Redux or prop data)
  const user = {
    firstName: "User1",
    lastName: "User1",
    email: "user1@gmail.com",
    role: "user",
  };

  return (
    <div className="max-w-sm w-full bg-white shadow-xl border border-gray-300 rounded-lg p-6">
      <div className="flex justify-center mb-6">
        <div className="bg-indigo-500 text-white rounded-full h-24 w-24 flex items-center justify-center text-4xl font-semibold shadow-md">
          {user.firstName?.[0] || ""}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-center text-gray-600 mb-2">{user.email}</p>
      <p className="text-center text-sm text-gray-500 mb-6">{user.role}</p>

      <button
        onClick={handleLogout}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
