import React from 'react';
import CategorySection from '../components/CategorySection';

const MainPage = () => {
  return (
    <section>
      {/* Главный баннер */}
      <div className="bg-secondary ">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            {/* Текстовое приветствие */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display mb-4 leading-tight text-foreground">
                Изысканные десерты <span className="text-primary">ручной работы</span>
              </h1>
              <p className="text-lg mb-6 text-muted-foreground font-body">
                Мы создаем нежные и восхитительные сладости из натуральных ингредиентов, 
                которые подарят вам настоящее наслаждение.
              </p>
            </div>
            {/* Изображение и декоративные круги */}
            <div className="md:w-1/2 relative">
            {/* Верхний круг(анимация) */}
              <div className="hidden sm:block aspect-square rounded-full bg-accent absolute -right-10 -top-20 w-64 h-64 animate-move"></div>
              {/* Основное изображение торта */}
              <img
                src="./image/cake.svg"
                alt="Торт"
                className="rounded-lg shadow-lg relative z-10 mx-auto"
              />
              {/* Нижние декоративные круги */}
              <div className="aspect-square rounded-full bg-muted absolute -left-16 -bottom-16 w-48 h-48 animate-move-reverse"></div>
              <div className="aspect-square rounded-full bg-muted absolute -right-10 -bottom-16 w-48 h-48 animate-move-reverse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Секция с категориями товаров */}
      <CategorySection />

      {/* Блок ждем вас в кондитерской" */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display mb-4">Ждем вас в нашей кондитерской!</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto font-body">
            Приходите к нам, чтобы насладиться свежими десертами и уютной атмосферой.
          </p>
          {/* Информация о часах работы */}
          <div className="inline-block bg-white p-4 rounded-lg shadow-md">
            <div className="font-display mb-1">Часы работы:</div>
            <div className="text-muted-foreground font-body">
              Пн-Пт: 9:00 - 21:00 <br />
              Сб-Вс: 10:00 - 18:00
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default MainPage;

