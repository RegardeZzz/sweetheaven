import React from 'react';

const LoadingCart = () => {
  return (
    <div className="flex flex-col justify-center items-center h-40 space-y-4">
      <div className="w-24 h-24 border-8 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground text-xl font-body">Загрузка корзины...</p>
    </div>
  );
};

export default LoadingCart;