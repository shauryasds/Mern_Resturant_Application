import { useState, useEffect } from 'react';
import apiUrl from '../backendUrl';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slice/UserSlice';
import { Link } from 'react-router-dom';
import Orders from '../components/Orders';

function User() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      console.log(editedUser, "editedUser");
      const response = await fetch(apiUrl.updateselfuser.url, {
        method: apiUrl.updateselfuser.method,
        body: JSON.stringify({ data: editedUser }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      dispatch(setUser(data));

      setSuccess('Profile updated successfully!');
      setEditing(false);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError('');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(apiUrl.deleteuser.url, {
        method: apiUrl.deleteuser.method,
        body: JSON.stringify({ userId: user._id }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSuccess('Account deleted successfully!');
      dispatch(setUser(null));

      setEditedUser({});
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className="user-profile mx-auto p-4 mt-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 text-black bg-red-200 p-4 text-center w-full">User Profile</h1>
        {user.role === 'admin' && (
          <Link
            to="/adminpanel"
            className="px-4 py-2 text-white bg-yellow-500 rounded-md font-bold hover:bg-yellow-700"
          >
            Admin Panel
          </Link>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <div className="grid grid-cols-1 gap-4 p-4 border shadow-2xl">
        {/* Name */}
        <div className="flex items-center">
          <label className="text-gray-700 mr-4 font-medium">Name</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          ) : (
            <p>{editedUser.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center">
          <label className="text-gray-700 mr-4 font-medium">Email</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          ) : (
            <p>{editedUser.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex items-center">
          <label className="text-gray-700 mr-4 font-medium">Phone</label>
          {editing ? (
            <input
              type="text"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          ) : (
            <p>{editedUser.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex items-center">
          <label className="text-gray-700 mr-4 font-medium">Address</label>
          {editing ? (
            <input
              type="text"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your address"
            />
          ) : (
            <p>{editedUser.address}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Delete Account
            </button>
          </>
        )}
      </div>

      <Orders />
    </div>
  );
}

export default User;