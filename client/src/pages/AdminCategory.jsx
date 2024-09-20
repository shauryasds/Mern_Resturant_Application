import React, { useState, useEffect } from 'react';
import apiUrl from '../backendUrl';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function CategoryAdmin() {
  const [categoryList, setCategoryList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});
  const [newCategory, setNewCategory] = useState({
    _id:'',
    name: '',
    imageUrl: ''
  });

  async function fetchdata() {
    try {
      const response = await fetch(apiUrl.getcategory.url, {
        method: apiUrl.getcategory.method,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      setCategoryList(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  const handleEdit = (category) => {
    setEditing(category._id);
    setEditedCategory(category);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(apiUrl.updatecategory.url, {
        method: apiUrl.updatecategory.method,
        body: JSON.stringify(editedCategory),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        const updatedCategoryList = categoryList.map((category) =>
          category._id === editing ? data.body : category
        );
        setCategoryList(updatedCategoryList);
        setEditing(null);
        setEditedCategory(data.body);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(apiUrl.deletecategory.url, {
        method: apiUrl.deletecategory.method,
        body: JSON.stringify({ categoryId }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const updatedCategoryList = categoryList.filter((category) => category._id !== categoryId);
        setCategoryList(updatedCategoryList);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCategory({ ...editedCategory, [name]: value });
  };

  const handleNewCategoryChange = (event) => {
    const { name, value } = event.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleCreateCategory = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(apiUrl.setcategory.url, {
        method: apiUrl.setcategory.method,
        body: JSON.stringify({...newCategory,url:newCategory.imageUrl}),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        const newCategoryWithId = { ...data.body, _id: data.body._id };
        setCategoryList([...categoryList, newCategoryWithId]);
        setNewCategory({
          _id:'',
          name: '',
          imageUrl: ''
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
const[createnewCategory,setcreatenewCategory]=useState(false)
  return (
    <div className="min-w-full m-4 p-4 mt-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg border hover:cursor-pointer border-black text-center  bg-red-400 font-bold mb-2" onClick={()=>{setcreatenewCategory(p=>!p)}}>Create New Category</h2>
      {createnewCategory && 
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleNewCategoryChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="imageUrl"
            type="text"
            name="imageUrl"
            value={newCategory.imageUrl}
            onChange={handleNewCategoryChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleCreateCategory}
        >
          Create Category
        </button>
      </form>}
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <table className="w-[100%] table-auto">
        <thead className='font-bold text-lg text-black'>
          <tr className='border border-x-gray-200 shadow-sm'>
            <th className="px-4 py-2 text-left w-[30%]">Image</th>
            <th className="px-4 py-2 text-left w-[30%]">Name</th>
            <th className="px-4 py-2 text-left w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category) => (
            <tr key={category._id} className="border border-y-gray-400 shadow-sm border-b border-gray-200 ">
              <td className="px-4 py-2 w-[40%]">
                {editing === category._id ? (
                  <textarea
                    name="imageUrl"
                    value={editedCategory.imageUrl}
                    onChange={handleInputChange}
                    className="w-full min-h-[40vh] p-2 border border-gray-400 rounded-lg"
                  />
                ) : (
                  <div className='h-20 overflow-hidden'>
                    <img src={category.imageUrl} className='object-cover w-20 h-10' alt={category.name} srcset="" />
                  </div>
                )}
              </td>
              <td className="px-4 py-2 w-[20%]">
                {editing === category._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedCategory.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                ) : (
                  category.name
                )}
              </td>
              <td className="px-4 py-2 w-[10%]">                {editing === category._id ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Edit
                  </button>
                )}
                {editing === category._id && (
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryAdmin;