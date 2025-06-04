import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    if (!product) return null;

    const { id, name, price, image, short_description } = product;

    

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/product/${id}`}>
                <div className="relative h-[300px] w-full overflow-hidden group">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-primary text-primary-foreground hover:bg-primary/70 h-9 rounded-md px-3 font-display">
                            Подробнее
                        </button>
                    </div>
                </div>
            </Link>
            <div className="p-4">
                <Link to={`/product/${id}`}>
                    <h3 className="font-medium text-lg mt-1 mb-2 hover:text-primary transition-colors font-display">
                        {name}
                    </h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2 font-body">{short_description}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold">{price}</span>
                    <Link to={`/product/${id}`}>
                    <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-full font-body">
                        Подробнее
                    </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
