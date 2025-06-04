import React from 'react'


const About = () => {
  return (
    <section>
            <div className='min-h-screen flex flex-col'>
              {/* Шапка секции — заголовок и описание */}
              <div className='bg-secondary py-16 md:py-24'>
                <div className='container mx-auto text-center '>
                  <h1 className='text-3xl md:text-4xl font-display mb-4'>О нашей кондитерской</h1>
                  <p className='text-lg text-muted-foreground mx-auto max-w-3xl font-body'>Мы создаем изысканные десерты, которые радуют глаз и дарят настоящее наслаждение вкусом.
                    Каждое наше изделие - это маленькое произведение искусства.
                  </p>
                </div>
              </div>

              {/* Наша история */}
              <div className='py-16'>
                <div className='container mx-auto px-4'>
                  <div className='flex flex-col md:flex-row items-center gap-10'>
                    {/* Картинка слева */}
                    <div className='md:w-1/2'>
                      <img src='./image/history.svg' alt='Наша история' className='rounded-lg shadow-lg w-full h-auto object-cover'></img>
                    </div>
                
                    <div className='md:w-1/2'>
                      <h2 className='text-2xl font-display mb-4'>Наша история</h2>

                      <p className='mb-4 text-muted-foreground font-body'> Кондитерская «Sweet Heaven» была основана в 2025 году с простой идеей: создавать вкусные и красивые десерты из натуральных ингредиентов. 
                          Начав с маленькой пекарни, мы постепенно расширялись, сохраняя нашу приверженность качеству и ручной работе.
                      </p>
                      <p className='text-muted-foreground font-body'>
                          Сегодня мы предлагаем широкий ассортимент тортов, пирожных, эклеров, макарунов и других сладостей, 
                          которые завоевали любовь наших клиентов. Каждый день мы экспериментируем с новыми вкусами и 
                          техниками, чтобы удивлять вас и делать ваши особые моменты еще более запоминающимися.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Наши ценности */}
              <div className='bg-muted/30 py-16'>
                <div className='container mx-auto px-4'>
                  <h2 className='text-2xl font-display text-center mb-10'>Наши ценности</h2>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

                    {/* Каточка ценности 1 */}
                    <div className='bg-background rounded-lg shadow-sm p-6'>
                      <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                        <div className='text-2xl'>🌿</div>
                      </div>
                      <h3 className='text-xl font-display mb-2'>Натуральные ингредиенты</h3>
                      <p className='text-muted-foreground font-body'>Мы используем тольок натуральные продукты высочайшего качества, без искуственных красителей и добавок</p>
                    </div>
                    {/* Каточка ценности 2 */}
                    <div className='bg-background rounded-lg shadow-sm p-6'>
                      <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                        <div className='text-2xl'>✨</div>
                      </div>
                      <h3 className='text-xl font-display mb-2'>Мастерство и творчество</h3>
                      <p className='text-muted-foreground font-body'>Мы используем тольок натуральные продукты высочайшего качества, без искуственных красителей и добавок</p>
                    </div>
                    {/* Каточка ценности 3 */}
                    <div className='bg-background rounded-lg shadow-sm p-6'>
                      <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                        <div className='text-2xl'>🤝</div>
                      </div>
                      <h3 className='text-xl font-display mb-2'>Натуральные игредиенты</h3>
                      <p className='text-muted-foreground font-body'>Мы используем тольок натуральные продукты высочайшего качества, без искуственных красителей и добавок</p>
                    </div>

                  </div>
                </div>
              </div>

              {/* Наша команда */}
              <div className='container mx-auto py-16'>
                <h1 className='text-2xl font-display text-center mb-10'>Наша команда</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>

                  {/* Участник 1 */}
                  <div className='text-center'>
                    <div className='aspect-square overflow-hidden rounded-full mx-auto w-40 h-40 mb-4'>
                      <img src='./image/team-shef.svg' alt='Виктория Сановна' className='object-cover '></img>
                    </div>
                    <h3 className='text-xl font-display'>Виктория Сановна</h3>
                    <p className='text-primary font-medium'>Шеф-кондитер</p>
                    <p className='text-muted-foreground mt-2 font-body'>Выпускница престижной кулинарной школы с 10-летним опытом работы</p>
                  </div>

                  {/* Участник 2 */}
                  <div className='text-center'>
                    <div className='aspect-square overflow-hidden rounded-full mx-auto w-40 h-40 mb-4'>
                      <img src='./image/team-cake.svg' alt='Максим Косяк' className='object-cover w-full h-full'></img>
                    </div>
                    <h3 className='text-xl font-display'>Максим Кисленко</h3>
                    <p className='text-primary font-medium'>Кондитер-декоратор</p>
                    <p className='text-muted-foreground mt-2 font-body'>Специалист по созданию уникальных дизайнерских тортов</p>
                  </div>
                  {/* Участник 3 */}
                  <div className='text-center'>
                    <div className='aspect-square overflow-hidden rounded-full mx-auto w-40 h-40 mb-4'>
                      <img src='./image/team-caramel.svg' alt='Анастасия Барановна' className='object-cover w-full h-full'></img>
                    </div>
                    <h3 className='text-xl font-display'>Анастасия Барановна</h3>
                    <p className='text-primary font-medium'>Шоколатье</p>
                    <p className='text-muted-foreground mt-2 font-body'>Специалист по созданию уникальных дизайнерский тортов</p>
                  </div>
                </div>
              </div>
            </div>
    </section>
  )
}

export default About;
