import React, { useEffect, useState } from 'react'
import ImageCards from '../components/ImageCards'
import Image from '../images/demo.PNG'
import apiUrl from '../backendUrl/index';
import { Link } from 'react-router-dom';


export default   function Category() {
  

  const [categoryList , setCategoryList]=useState([]);
  async function fetchdata(){
   const fetchdata=await fetch(apiUrl.getcategory.url,{
      method:apiUrl.getcategory.method
    })
    const response=await fetchdata.json();
     
     setCategoryList(response.data);
     
  }
  useEffect(()=>{
    fetchdata();
    
  },[])
  return (
    <div className='bg-gray-800 text-red-300 mt-8'>
      <div className="heading pt-3 flex justify-center text-white shadow-xl font-extrabold p-2 items-center border-b-2 border-white">
        <h1>CATEGORIES</h1>
      </div>
      
      <div className='flex flex-wrap items-center justify-center'>
      {
        categoryList && categoryList.map((data) => (
          <Link to={`categoryproduct/${data.name}`}>
            <li className='list-none'   key={data._id}>
            <ImageCards text={data.name} image={data.imageUrl} />
          </li>
         </Link>
        ))
      }

      </div>
    </div>
  )
}
