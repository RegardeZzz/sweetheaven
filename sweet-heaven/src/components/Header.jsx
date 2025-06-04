import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropMenu from './DropMenu'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        setShowMenu(true);
        setTimeout(() => setIsMenuOpen(true), 10);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setTimeout(() => setShowMenu(false), 300);
    };

    return (
        <header>
            <section className="bg-white shadow-sm top-0 z-50">
                <div className="container mx-auto px-4 py-3 relative">
                    <div className="flex items-center justify-between">

                        {/* Лого */}
                        <div className="flex items-center">
                            <Link to="/" className="text-primary font-display text-2xl">Sweet Heaven</Link>
                        </div>

                        {/* Навигация */}
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="font-medium hover:text-primary transition-colors">Главная</Link>
                            <Link to="/catalog" className="font-medium hover:text-primary transition-colors">Каталог</Link>
                            <Link to="/about" className="font-medium hover:text-primary transition-colors">О нас</Link>
                            <Link to="/contacts" className="font-medium hover:text-primary transition-colors">Контакты</Link>
                        </div>

                        {/* Иконки */}
                        <div className="flex items-center space-x-4">
                            <DropMenu />
                            <Link to="/cart" className="hover:opacity-80 transition-opacity">
                                <button className="p-1">
                                    <img src="./image/shop.svg" alt="Корзина" />
                                </button>
                            </Link>
                            <button className="md:hidden text-primary font-semibold" onClick={openMenu}>Меню</button>
                        </div>
                    </div>
                </div>

                {/* Мобильное меню */}
                {showMenu && (
                    <div className="fixed inset-0 z-50">
                        {/* затемнение */}
                        <div
                            className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-50' : 'opacity-0'}`}
                            onClick={closeMenu}
                        />

                        {/* панель меню */}
                        <div
                            className={`absolute top-0 right-0 mt-4 mr-4 w-64 bg-white shadow-xl rounded-xl p-6 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                        >
                            <button
                                className="absolute top-2 right-3 text-primary text-2xl"
                                onClick={closeMenu}
                            >
                                ✕
                            </button>
                            <nav className="mt-8 flex flex-col items-center text-center space-y-4 text-lg font-semibold text-gray-800 w-full">
                                <Link to="/" onClick={closeMenu} className="w-full py-2 border-b border-gray-200 hover:text-primary transition-colors duration-200">Главная</Link>
                                <Link to="/catalog" onClick={closeMenu} className="w-full py-2 border-b border-gray-200 hover:text-primary transition-colors duration-200">Каталог</Link>
                                <Link to="/about" onClick={closeMenu} className="w-full py-2 border-b border-gray-200 hover:text-primary transition-colors duration-200">О нас</Link>
                                <Link to="/contacts" onClick={closeMenu} className="w-full py-2 border-b border-gray-200 hover:text-primary transition-colors duration-200">Контакты</Link>
                            </nav>
                        </div>
                    </div>
                )}
            </section>
        </header>
    );
};

export default Header;
