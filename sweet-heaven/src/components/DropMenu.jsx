import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthenticated = Object.keys(user).length > 0; //  Проверка логина

  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // удаление токена
    setOpen(false);
    navigate('/login'); // возврат на главную
    window.location.reload(); // перезагрузка UI
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:text-primary focus:outline-none"
      >
        <img src='./image/user.svg' className="h-5 w-5" alt='Пользователь' />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Мой профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
