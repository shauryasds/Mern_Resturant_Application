import ProductCards from '../components/ProductCards';
import React, { useEffect, useState } from 'react'
import apiUrl from '../backendUrl/index';
import Filter from '../components/Filter';
import { useLocation, useParams } from 'react-router-dom';

function CategoryProduct() {
    const params=useParams();
    const category=params.category
  function onFilterChange(filterOptions){
    const filterproductdata = productList.filter(product=>{
      let priceMatch = true;
      if (filterOptions.price !== '') {
        priceMatch = product.price <= Number(filterOptions.price);
    
      }
      let ratingMatch = true;
      if (filterOptions.rating !== '') {
        ratingMatch = product.rating >= Number(filterOptions.rating);
      }
      return priceMatch && ratingMatch;
    });
    setFilteredproductList(filterproductdata);
  }
    const [productList , setproductList]=useState([]);
const [filteredproductList , setFilteredproductList]=useState([]);
async function fetchdata(){
 const fetchdata=await fetch(apiUrl.getproduct.url,{
    method:apiUrl.getproduct.method
  })
  let response=await fetchdata.json();
  response=response.data
  const filteredRes=response.filter((product)=>{
    if(product.category){
        console.log(product.category,category)
    return product.category===category}
    return false;}
   )
   setproductList(filteredRes);
   setFilteredproductList(filteredRes)
}
useEffect(()=>{
  fetchdata();
  
},[])
return (
  <div className='bg-white mt-4 border-b-2 border-black'>
    <div className="heading py-3 flex justify-center text-black  items-center border-b-2 border-black">
      <h1>All CategoryProduct</h1>
    </div>
    <div className='grid grid-cols-[20%_1fr] gap-4 '>

<Filter onFilterChange={onFilterChange}/>
 <div className='flex flex-wrap border-l-2 border-black items-center justify-center'>
    {
      filteredproductList && filteredproductList.map((data) => (
        <li className='list-none' key={data._id}>
         
          <ProductCards product={{...data , quantity:1}} text={data.name} body={data.body} image={data.imageUrl} price ={data.price} />
        </li>
      ))
    }
    </div>
    </div>

  </div>
)

}

export default CategoryProduct
