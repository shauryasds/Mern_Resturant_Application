import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import backgroundImage from '../images/mylogo.webp';
import Category from './Category';
import Products from './Products';
import apiUrl from '../backendUrl';
import ProductCards from '../components/ProductCards';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  async function fetchProducts() {
    const response = await fetch(apiUrl.getproduct.url, {
      method: apiUrl.getproduct.method,
    });
    const data = await response.json();
    setProducts(data.data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      const filteredProducts = products.filter((product) => {
        const productName = product.name.toLowerCase();
        const searchQueryLowercase = searchQuery.toLowerCase();
        return productName.includes(searchQueryLowercase);
      });
      setSearchResults(filteredProducts);
    }
  }, [searchQuery, products]);

  function handleSearchClick(product) {
    setSelectedProduct(product);
  }

  function handleClose() {
    setSelectedProduct(null);
  }

  return (
    <div className="relative h-screen">
      <img
        src={backgroundImage}
        alt="backgroundImage"
        className="w-full h-[85vh] object-cover bg-cover bg-center z-0"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            className="w-[80vw] py-2 px-4 h-[10vh] border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Search for restaurants or dishes"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <CiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-500" />
        </div>
        <ul
          className={searchQuery === '' || searchResults.length === 0 ? 'hidden' : 'list-none max-h-40 w-full overflow-scroll absolute p-0 m-0 bg-white shadow-md rounded-lg'}
        >
          {searchResults.map((product) => (
            <li key={product.id} onClick={() => handleSearchClick(product)} className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100">
              {product.name}
            </li>
          ))}
        </ul>
        {selectedProduct && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <ProductCards
              product={{ ...selectedProduct, quantity: 1 }}
              text={selectedProduct.name}
              body={selectedProduct.body}
              image={selectedProduct.imageUrl}
              price={selectedProduct.price}
            />
            <button onClick={handleClose} className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 text-3xl text-white">
              X
            </button>
          </div>
        )}
      </div>
      <div className="sticky top-0 bg-black  w-full h-full overflow-y-auto z-10">
       
        <Category />
        <div className='sticky top-0 h-full overflow-y-auto '>
        <Products />
        </div>
      </div>
    </div>
  );
}

export default Home;
