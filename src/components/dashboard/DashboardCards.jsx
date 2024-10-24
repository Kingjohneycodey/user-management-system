import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaUserCheck, FaUserClock } from 'react-icons/fa'; // Import icons from react-icons
import { API_URL, token } from '../../utils/config';

const DashboardCards = () => {
  const [stats, setStats] = useState({
    allUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats data from the API
    const fetchStats = async () => {
      try {

        const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

        // Assuming the API returns { allUsers, activeUsers, pendingUsers }
        setStats({
            allUsers: response.data.users.length,
            activeUsers: 0,
            pendingUsers: 0,
          });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* All Users Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="p-4 bg-blue-100 text-blue-500 rounded-full">
          <FaUsers size={24} />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">All Users</h2>
          <p className="text-2xl font-bold">{stats.allUsers}</p>
        </div>
      </div>

      {/* Active Users Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="p-4 bg-green-100 text-green-500 rounded-full">
          <FaUserCheck size={24} />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-2xl font-bold">{stats.activeUsers}</p>
        </div>
      </div>

      {/* Pending Users Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="p-4 bg-yellow-100 text-yellow-500 rounded-full">
          <FaUserClock size={24} />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Pending Users</h2>
          <p className="text-2xl font-bold">{stats.pendingUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
