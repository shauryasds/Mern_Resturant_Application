import { useState, useEffect } from 'react';
import apiUrl from '../backendUrl';

function AdminUser() {
  const [userList, setUserList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  async function fetchUserData() {
    try {
      const response = await fetch(apiUrl.getuser.url, {
        method: apiUrl.getuser.method,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserList(data.data );
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = (user) => {
    setEditing(user?._id);
    setEditedUser(user || {});
  };

  const handleSave = async () => {
    try {
      console.log(editedUser,'editedUser')
      const response = await fetch(apiUrl.updateuser.url, {
        method: apiUrl.updateuser.method,
        body: JSON.stringify(editedUser),
        headers: {
          'Content-Type': 'application/json',
        },
        
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        const updatedUserList = userList.map((user) =>
          user?._id === editing ? data.body : user
        );
        setUserList(updatedUserList);
        setEditing(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(apiUrl.deleteuser.url, {
        method: apiUrl.deleteuser.method,
        body: JSON.stringify({ userId }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const updatedUserList = userList.filter((user) => user?._id !== userId);
        setUserList(updatedUserList);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="min-w-full m-4 p-4 mt-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-[100%] table-auto">
        <thead className="font-bold text-lg text-black">
          <tr className="border border-x-gray-200 shadow-sm">
            <th className="px-4 py-2 text-left w-[20%]">Name</th>
            <th className="px-4 py-2 text-left w-[20%]">Role</th>
            <th className="px-4 py-2 text-left w-[20%]">Email</th>
            <th className="px-4 py-2 text-left w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            user ? (
              <tr key={user._id} className="border border-y-gray-400 shadow-sm border-b border-gray-200">
                <td className="px-4 py-2 w-[20%]">
                  {editing === user._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-400 rounded-lg"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="px-4 py-2 w-[20%]">
                  {editing === user._id ? (
                    <select
                      name="role"
                      value={editedUser.role || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-400 rounded-lg"
                    >
                      <option value="admin">Admin</option>
                      <option value="general">General</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-4 py-2 w-[20%]">
                  {editing === user._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-400 rounded-lg"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-4 py-2 w-[10%]">
                  {editing === user._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUser;
