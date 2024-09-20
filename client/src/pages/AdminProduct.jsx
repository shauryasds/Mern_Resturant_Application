import React, { useState, useEffect } from 'react';
import apiUrl from '../backendUrl';
import { toast } from 'react-toastify';

function AdminProduct() {
  const [productList, setProductList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({
    
    name: '',
    imageUrl: '',
    price: 0,
    body: '',
    category: ''
  });

  async function fetchdata() {
    try {
      const response = await fetch(apiUrl.getproduct.url, {
        method: apiUrl.getproduct.method,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProductList(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, [newProduct]);

  const handleEdit = (product) => {
    setEditing(product._id);
    setEditedProduct(product);
  };

  const handleCreateProduct = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(apiUrl.setproduct.url, {
        method: apiUrl.setproduct.method,
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        const newProductWithId = { ...data.body, _id: data.body._id };
        setProductList([...productList, newProductWithId]);
        toast.success("Product Created")
        setNewProduct({
          _id:'',
          name: '',
          imageUrl: '',
          price: 0,
          body: '',
          category: ''
        });
      } else {
        toast.success(`HTTP error! status: ${response.status}`)

        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      toast.success(error)
      
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(apiUrl.updateProduct.url, {
        method: apiUrl.updateProduct.method,
        body: JSON.stringify(editedProduct),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        const updatedProductList = productList.map((product) =>
          product._id === editing ? data.body : product
        );
        setProductList(updatedProductList);
        setEditing(null);
        setEditedProduct(data.body);
        toast.success('sucess')
        
      } else {
        toast.success(`HTTP error! status: ${response.status}`)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      toast.success(`${error}error`)

      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(apiUrl.deleteproduct.url, {
        method: apiUrl.deleteproduct.method,
        body: JSON.stringify({ productId }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const updatedProductList = productList.filter((product) => product._id !== productId);
        setProductList(updatedProductList);
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
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
const [createnewproduct,setcreatenewproduct]=useState(false)
  return (
    <div className="min-w-full m-4 p-4 mt-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg border hover:cursor-pointer border-black text-center  bg-red-400 font-bold mb-2" onClick={()=>{setcreatenewproduct(p=>!p)}}>Create New Product</h2>
      {createnewproduct && <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleNewProductChange}
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
            value={newProduct.imageUrl}
            onChange={handleNewProductChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
            Body
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="body"
            name="body"
            value={newProduct.body}
            onChange={handleNewProductChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleNewProductChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleCreateProduct}
        >
          Create Product
        </button>
      </form>}
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <table className="w-[100%] table-auto">
        <thead className='font-bold text-lg text-black'>
          <tr className='border border-x-gray-200 shadow-sm'>
            <th className="px-4 py-2 text-left w-[20%]">Image</th>          
            <th className="px-4 py-2 text-left w-[20%]">Name</th>
            <th className="px-4 py-2 text-left w-[20%]">Category</th>
            <th className="px-4 py-2 text-left w-[20%]">Price</th>
            <th className="px-4 py-2 text-left w-[40%]">Body</th>
            <th className="px-4 py-2 text-left w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product._id} className="border border-y-gray-400 shadow-sm border-b border-gray-200 ">
              <td className="px-4 py-2 w-[10%] h-full">
                {editing === product._id ? (
                  <input
                    type="text"
                    name="imageUrl"
                    value={editedProduct.imageUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                ) : (
                  <img src={product.imageUrl} alt={product.name} width={50} height={50} />
                )}
              </td>
              <td className="px-4 py-2 w-[20%]">
                {editing === product._id ? (
                  <input
                    type="text"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                ) : (
                  product.category
                )}
              </td>
              <td className="px-4 py-2 w-[20%]">
                {editing === product._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="px-4 py-2 w-[20%]">
                {editing === product._id ? (
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                ) : (
                  product.price
                )}
              </td>
              <td className="px-4 py-2 min-w-[30%]">
                {editing === product._id ? (
                  <textarea
                    name="body"
                    value={editedProduct.body}
                    onChange={handleInputChange}
                    className="w-full min-h-[40vh] p-2 border border-gray-400 rounded-lg"
                  />
                ) : (
                  <div className='h-20 overflow-hidden'>
                    {product.body}
                  </div>
                )}
              </td>
              <td className="px-4 py-2 w-[10%]">
                {editing === product._id ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Edit
                  </button>
                )}
                {editing === product._id && (
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProduct;