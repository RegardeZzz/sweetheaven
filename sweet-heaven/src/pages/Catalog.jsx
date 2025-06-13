import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'            // Компонент карточки товара
import productApi from '../api/productApi'                     // API-запросы к бэкенду
import { useSearchParams } from 'react-router-dom';            // Получение query-параметров из URL
import Loadingv2 from '../components/Loadingv2';

const Catalog = () => {
    const [searchParams] = useSearchParams();  // Получаем параметры из URL (например, ?category=cakes)
    const [activeTab, setActiveTab] = useState('all')  // Активная вкладка (по умолчанию — все товары)

    // Стейт для хранения данных по категориям
    const [products, setProducts] = useState({
        cakes: [],
        eclairs: [],
        macarons: [],
        loading: true,
        error: null
    });

    //  При загрузке проверяем, есть ли в URL параметр `category`
    useEffect(() => {
        const category = searchParams.get('category');
        if (category && ['cakes', 'eclairs', 'macarons'].includes(category)) {
            setActiveTab(category);
        }
    }, [searchParams]);

    // Загружаем товары с сервера при первом рендере
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const [cakes, eclairs, macarons] = await Promise.all([
                    productApi.getProductsByCategory('cakes'),
                    productApi.getProductsByCategory('eclairs'),
                    productApi.getProductsByCategory('macarons'),
                ]);

                setProducts({
                    cakes: cakes.data,
                    eclairs: eclairs.data,
                    macarons: macarons.data,
                    loading: false,
                    error: null
                });
            } catch (error) {
                setProducts({
                    cakes: [],
                    eclairs: [],
                    macarons: [],
                    loading: false,
                    error: 'Ошибка загрузки данных'
                });
            }
        };

        loadProduct();
    }, []);

    //  Пока данные загружаются, показываем скелеты
    if (products.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loadingv2></Loadingv2>
            </div>
        );
    }

    //  В случае ошибки выводим сообщение
    if (products.error) return <div>{products.error}</div>

    // Основной рендер каталога
    return (
        <div className='min-h-screen flex flex-col'>
            <div className='container mx-auto px-4 py-8'>
                <h1 className='text-3xl font-display mb-6'>Каталог продукции</h1>
                <p className='text-muted-foreground mb-8 font-body'>
                    Откройте для себя наш широкий ассортимент свежих кондитерских изделий, приготовленных с любовью и вниманием к каждой детали.
                    Все наши десерты готовятся из натуральных ингредиентов высшего качества.
                </p>

                {/*  Переключение вкладок */}
                <div className='mb-10'>
                    <div className='inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground h-10 mb-6 p-1'>
                        {['all', 'cakes', 'eclairs', 'macarons'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                    activeTab === tab ? 'bg-background text-foreground shadow-sm' : ''
                                }`}
                            >
                                {{
                                    all: 'Все товары',
                                    cakes: 'Торты',
                                    eclairs: 'Эклеры',
                                    macarons: 'Макаруны'
                                }[tab]}
                            </button>
                        ))}
                    </div>

                    {/*  Контент по выбранной вкладке */}

                    {/* Все товары */}
                    {activeTab === 'all' && (
                        <div>
                            {['cakes', 'eclairs', 'macarons'].map((cat) => (
                                <div key={cat}>
                                    <h2 className="text-2xl font-display mb-4">
                                        {{ cakes: 'Торты', eclairs: 'Эклеры', macarons: 'Макаруны' }[cat]}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                                        {products[cat].map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-200 my-8"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Только Торты */}
                    {activeTab === 'cakes' && (
                        <div>
                            <h2 className="text-2xl font-display mb-4">Торты</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.cakes.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Только Эклеры */}
                    {activeTab === 'eclairs' && (
                        <div>
                            <h2 className="text-2xl font-display mb-4">Эклеры</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.eclairs.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Только Макаруны */}
                    {activeTab === 'macarons' && (
                        <div>
                            <h2 className="text-2xl font-display mb-4">Макаруны</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.macarons.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Catalog;
