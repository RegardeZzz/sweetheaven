import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';

const Error404 = () => {
  const location = useLocation();

  useEffect(() =>{
    console.error(
      "404 Error: User attempted to access non-existent route",
      location.pathname
    );
  }, [location.pathname]) ;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>404</h1>
        <p className=''>Ooooooppppsss! Страница не была найдена</p>
        <a href='/' className='text-blue-500 hover:text-blue-700 underline'>Вернуться на ГЛАВНУЮ СТРАНИЦУ </a>
      </div>
    </div>
  )
}

export default Error404;
