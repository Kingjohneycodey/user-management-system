import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, token } from '../../utils/config';
import toast from 'react-hot-toast';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {

  

        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(response.data); // Assume API returns {name, email}
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {

        if (!profile.name) {
            toast.error('Name is required.');
            return;
          }

          if (!profile.email) {
            toast.error('Email is required.');
            return;
          }

      const response = await axios.put(
        `${API_URL}/users/profile` ,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-2 p-6 min-h-[70vh] bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">User Profile Settings</h1>

      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            disabled={!editing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              editing ? 'bg-white' : 'bg-gray-100'
            }`}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            disabled={!editing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              editing ? 'bg-white' : 'bg-gray-100'
            }`}
            required
          />
        </div>

        <div className={`mb-4 ${
              editing ? '': 'hidden'}`}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={profile?.password}
            onChange={handleInputChange}
            disabled={!editing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              editing ? 'bg-white' : ''
            }`}
          />
        </div>

        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Settings;
