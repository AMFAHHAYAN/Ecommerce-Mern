import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "../apiClient";
import Icons from "../assets/Icons";
import PaginationComponent from "../components/PaginationComponent";

const UserTable = () => {
  const { token } = useSelector((state) => state.loggedInData);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async (page) => {
    try {
      const response = await apiClient.get(`/users`, {
        headers: {
          Authorization: token,
        },
      });
      setUsers(response.data.users);
      setTotalPage(Math.ceil(response.data.total / usersPerPage));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 rounded-lg shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        User List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-indigo-300 rounded-lg shadow-md">
          <thead className="bg-indigo-500 text-white sticky top-0">
            <tr>
              <th className="py-4 px-6 border-b font-semibold">SR No</th>
              <th className="py-4 px-6 border-b font-semibold">First Name</th>
              <th className="py-4 px-6 border-b font-semibold">Last Name</th>
              <th className="py-4 px-6 border-b font-semibold">Email</th>
              <th className="py-4 px-6 border-b font-semibold">
                Mobile Number
              </th>
              <th className="py-4 px-6 border-b font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="text-center hover:bg-indigo-50 transition-all duration-200"
              >
                <td className="py-4 px-6 border-b text-gray-600">
                  {(currentPage - 1) * usersPerPage + index + 1}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 font-medium">
                  {user?.firstName}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 font-medium">
                  {user?.lastName}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {user?.email}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {user?.mobileNumber}
                </td>
                <td className="py-4 px-6 border-b">
                  <div className="flex justify-center space-x-6">
                    <button
                      className="text-indigo-500 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-all duration-150"
                      title="View"
                    >
                      <Icons.EYE className="text-xl" />
                    </button>
                    <button
                      className="text-green-500 font-semibold py-2 px-4 rounded-lg hover:bg-green-200 transition-all duration-150"
                      title="Edit"
                    >
                      <Icons.EDIT className="text-xl" />
                    </button>
                    <button
                      className="text-red-500 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 transition-all duration-150"
                      title="Delete"
                    >
                      <Icons.DELETE className="text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPage={totalPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default UserTable;
