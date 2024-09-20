import React, { useState, useEffect } from 'react';

function ImageCards(props) {
  

  return (
    <div className='flex  flex-col items-center m-4 p-2 w-48 '>
      <div className="image rounded-full w-24 h-24 object-cover overflow-hidden shadow-md">
       <img src={props.image} alt={props.text} className="rounded-full w-full h-full object-cover" />
      </div>
      <div className="text text-center text-lg font-medium mt-2">{props.text}</div>
    </div>
  );
}

export default ImageCards;