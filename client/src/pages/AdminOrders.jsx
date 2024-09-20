import { useState, useEffect } from 'react';
import apiUrl from '../backendUrl';

function Adminorder() {
  const [orderList, setorderList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedorder, setEditedorder] = useState({});

  async function fetchOrderData() {
    try {
      const response = await fetch(apiUrl.getorderadmin.url, {
        method: apiUrl.getorderadmin.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setorderList(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchOrderData();
  }, []);

  const handleEdit = (order) => {
    setEditing(order._id);
    setEditedorder(order);
  };

  const handleSave = async () => {
    try {
      console.log(editedorder, 'editedorder');
      const response = await fetch(apiUrl.updateorder.url, {
        method: apiUrl.updateorder.method,
        body: JSON.stringify({
            uid: editedorder._id,
            pid: editedorder.productId._id,
            quantity: editedorder.quantity,
            totalprice: editedorder.totalPrice,
            status:editedorder.status
          }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
console.log('res form ',response)
// const res=await response.json();
if (response.ok) {
    let res=await response.json();
    console.log(res,'res')
    const updatedorderList = orderList?.map((order) =>
    order._id === editing ? editedorder : order
    );
        setorderList(updatedorderList);
        console.log(updatedorderList,'updatedorderList')
        setEditing(null);
      } else {
        console.error(response.message);
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
    setEditedorder((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="min-w-full m-4 p-4 mt-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">orders</h1>
      <table className="w-[100%] table-auto">
        <thead className="font-bold text-lg text-black">
          <tr className="border border-x-gray-200 shadow-sm">
            <th className="px-4 py-2 text-left w-[20%]">Product Name</th>
            <th className="px-4 py-2 text-left w-[20%]">Quantity</th>
            <th className="px-4 py-2 text-left w-[20%]">Total Price</th>
            <th className="px-4 py-2 text-left w-[20%]">Status</th>
            <th className="px-4 py-2 text-left w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList?.map((order) => (
            order ? (
              <tr key={order._id} className="border border-y-gray-400 shadow-sm border-b border-gray-200">
                <td className="px-4 py-2 w-[20%]">
                  {order.productId.name}
                </td>
                <td className="px-4 py-2 w-[20%]">
                  {order.quantity}
                </td>
                <td className="px-4 py-2 w-[20%]">
                  {order.totalPrice}
                </td>
                <td className="px-4 py-2 w-[20%]">
                  {editing === order._id ? (
                    <select
                      name="status"
                      value={editedorder.status || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-400 rounded-lg"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
                <td className="px-4 py-2 w-[10%]">
                  {editing === order._id ? (
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
                      onClick={() => handleEdit(order)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Adminorder;