import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-40 space-y-4">
      <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground text-sm font-body">Загрузка...</p>
    </div>
  );
};

export default Loading;