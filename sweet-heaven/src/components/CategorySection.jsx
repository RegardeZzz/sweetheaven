import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Функция для склонения слова "вид" в зависимости от количества
const getWordForm = (count) => {
  if (count === 1) return 'вид'; // 1 вид
  if (count > 1 && count < 5) return 'вида'; // 2, 3, 4 вида
  return 'видов';  // 5+ видов
};

// Карточка категории
const CategoryCard = ({ name, image, count, slug }) => {
  const navigate = useNavigate();

  //  При клике — переход на каталог с выбранной категорией
  const handleClick = () => {
    navigate(`/catalog?category=${slug}`);
  };

  return (
    <div onClick={handleClick} className="relative overflow-hidden rounded-lg group cursor-pointer">
      {/* изображения с анимацией при наведении */}
      <div className="aspect-square md:aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Затемнение и текст снизу изображения */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-xl">{name}</h3>
        <p className="text-white/70 text-sm">{count} {getWordForm(count)}</p>
      </div>
    </div>
  );
};

// Основной компонент секции
const CategorySection = () => {
  const [categories, setCategories] = useState([]); // Список категорий с бэкенда
  const [counts, setCounts] = useState({}); // Кол-во товаров по категориям

  useEffect(() => {
    //  Запрашиваем список категорий с API
    axios.get('https://sweeth-backend.onrender.com/api/categories/')
      .then(res => {
        setCategories(res.data); // сохраняем список категорий
      })
      .catch(err => console.error('Ошибка загрузки категорий:', err));

    // Получаем все продукты, чтобы посчитать количество по категориям
    axios.get('https://sweeth-backend.onrender.com/api/products/')
      .then(res => {
        const countByCategory = {};
        res.data.forEach(product => {
          const slug = product.category_slug; // получаем slug категории из продукта
          countByCategory[slug] = (countByCategory[slug] || 0) + 1; // увеличиваем счётчик
        });
        setCounts(countByCategory); // сохраняем результат в state
      })
      .catch(err => console.error('Ошибка загрузки товаров:', err));
  }, []);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* Заголовок секции */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display">Наши категории</h2>
          <p className="text-muted-foreground mt-2 font-body">Выберите то, что вам по вкусу</p>
        </div>

        {/* Сетка карточек категорий */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name} // Название категории
              slug={category.slug} // Slug категории (для перехода)
              image={`/image/${category.slug}.svg`} // путь до локальной картинки
              count={counts[category.slug] || 0} // Кол-во товаров в категории
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
