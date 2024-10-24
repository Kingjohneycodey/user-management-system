import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, token } from '../../utils/config';

const Table = () => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Set the page size (e.g., 10 users per page)
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = (query = '') => {
        axios.get(`${API_URL}/users/search`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
                page: currentPage,
                pageSize,
                search: query, 
              },
          })
          .then(response => {
            setData(response.data.users);
            setTotalUsers(response.data.totalUsers);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
    
            setLoading(false);
          })
          .catch(error => {
            console.error("There was an error fetching data!", error);
            setLoading(false);
          });
    }
    fetchUsers(searchQuery)
   
  }, [currentPage, pageSize, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8">

          {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="w-full bg-indigo-600 text-white">
            <th className="py-2 px-4 text-left">S/N</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                 <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white font-bold rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white font-bold rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}


const Users = () => {
  return (
    <div>


        <h2 className='text-3xl font-bold'>All Members</h2>


        <Table />
    </div>
  )
}

export default Users