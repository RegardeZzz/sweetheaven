import React from 'react';

const LoadingProduct = () => {
  return (
    <div className="flex flex-col justify-center items-center h-40 space-y-4">
      <div className="w-24 h-24 border-8 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground text-xl font-body">Загрузка продукта...</p>
    </div>
  );
};

export default LoadingProduct;