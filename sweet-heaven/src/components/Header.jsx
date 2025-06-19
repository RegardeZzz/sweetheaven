import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import DropMenu from './DropMenu';
import { CartContext } from './CartContext';

const Header = () => {
  const {totalItems} = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className="bg-white shadow-sm z-50 relative">
      <div className="container mx-auto px-6 md:px-4 py-3 flex items-center justify-between">
        {/* Логотип */}
        <Link to="/" className="text-primary font-display text-2xl tracking-wide">Sweet Heaven</Link>

        {/* Навигация (десктоп) */}
        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
          <Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
          <Link to="/about" className="hover:text-primary transition-colors">О нас</Link>
          <Link to="/contacts" className="hover:text-primary transition-colors">Контакты</Link>
        </nav>

        {/* Иконки */}
        <div className="flex items-center space-x-4">
          <DropMenu />
          <Link to="/cart" className='relative'>
            <img src="/image/shop.svg" alt="Корзина" className="w-6 h-6 hover:opacity-75 transition-opacity" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Бургер-меню */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-between w-6 h-5 relative z-50"
            aria-label="Мобильное меню"
          >
            <span className={`block h-0.5 bg-black rounded transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-black rounded transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-black rounded transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        {/* Затемнение */}
        <div
          className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
          onClick={toggleMenu}
        />

        {/* Ссылки */}
        <div className="absolute right-0 top-0 w-full h-full bg-white p-8 flex flex-col items-center justify-center space-y-8 text-xl font-semibold text-gray-800 shadow-xl">
          <Link to="/" onClick={toggleMenu} className="hover:text-primary transition-all duration-200">Главная</Link>
          <Link to="/catalog" onClick={toggleMenu} className="hover:text-primary transition-all duration-200">Каталог</Link>
          <Link to="/about" onClick={toggleMenu} className="hover:text-primary transition-all duration-200">О нас</Link>
          <Link to="/contacts" onClick={toggleMenu} className="hover:text-primary transition-all duration-200">Контакты</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
