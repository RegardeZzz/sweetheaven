import React, { useState } from 'react'
import axios from 'axios'

const Contacts = () => {
  //  Локальные состояния для полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  //  Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем данные на Django API
      await axios.post('https://sweeth-backend.onrender.com/api/contact/send/', {
        name,
        email,
        subject,
        message,
      });
      alert('Сообщение отправлено!');

      // Очищаем поля после отправки
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      alert('Произошла ошибка при отправке. Попробуйте позже.');
    }
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-display mb-6'>Контакты</h1>
        <p className='text-muted-foreground max-w-3xl mb-8 font-body'>
          Мы всегда рады видеть вас в нашей кондитерской! Вы также можете связаться с нами по телефону, электронной почте или через форму обратной связи.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/*  Левая колонка с контактной информацией */}
          <div>
            <h2 className='text-2xl font-display mb-6'>Наши контакты</h2>
            <div className='space-y-6'>
              {/* Адрес */}
              <div className='flex items-center'>
                <img src='/image/map_pin.svg' className='mr-3 mt-1' alt='Пин карты' />
                <div>
                  <h3 className='font-display'>Адрес</h3>
                  <p className='text-muted-foreground font-body'>г.Владивосток, ул.Баляева 36</p>
                </div>
              </div>

              {/* Телефон */}
              <div className='flex items-center'>
                <img src='/image/phone.svg' className='mr-3 mt-1' alt='Телефон' />
                <div>
                  <h3 className='font-display'>Телефон</h3>
                  <p className='text-muted-foreground font-body'>+7 (914) 665-35-38</p>
                </div>
              </div>

              {/* Email */}
              <div className='flex items-center'>
                <img src='/image/mail.svg' className='mr-3 mt-1' alt='Почта' />
                <div>
                  <h3 className='font-display'>Email</h3>
                  <p className='text-muted-foreground font-body'>belkov-ki@mail.ru</p>
                </div>
              </div>

              {/* Время работы */}
              <div className='flex items-center'>
                <img src='/image/clock.svg' className='mr-3 mt-1' alt='Часы' />
                <div>
                  <h3 className='font-display'>Время работы</h3>
                  <p className='text-muted-foreground font-body'>
                    Пн-Пт: 9:00 - 21:00<br />
                    Сб-Вс: 10:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Ссылки на соцсети */}
            <div className='mt-8'>
              <h3 className='font-display mb-3 text-2xl'>Мы в социальных сетях</h3>
              <div className='flex space-x-4'>
                <a href='https://www.youtube.com/@spasatelibesov4051' className='bg-primary/10 rounded-full hover:bg-primary/20 w-10 h-10 flex items-center justify-center'>
                  <img src='/image/youtube.svg' alt='YouTube' />
                </a>
                <a href='https://t.me/+CQ2Lu3fGQWc2OTdi' className='bg-primary/10 rounded-full hover:bg-primary/20 w-10 h-10 flex items-center justify-center'>
                  <img src='/image/telegram.svg' alt='Telegram' />
                </a>
                <a href='https://vk.com/club228691255' className='bg-primary/10 rounded-full hover:bg-primary/20 w-10 h-10 flex items-center justify-center'>
                  <img src='/image/vk.svg' alt='VK' />
                </a>
              </div>
            </div>
          </div>

          {/*  Правая колонка с формой */}
          <div>
            <h2 className='text-2xl font-display mb-6'>Напишите нам</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Имя */}
                <div className='space-y-2'>
                  <label className='font-medium text-sm'>Имя:</label>
                  <input
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base'
                    placeholder='Имя'
                    type='text'
                    name='firstname'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className='space-y-2'>
                  <label className='font-medium text-sm'>Email:</label>
                  <input
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base'
                    placeholder='email'
                    type='email'
                    name='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Тема */}
              <div className='space-y-2'>
                <label className='font-medium text-sm'>Тема:</label>
                <input
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base'
                  placeholder='Тема сообщения'
                  type='text'
                  name='subject'
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Сообщение */}
              <div className='space-y-2'>
                <label className='font-medium text-sm'>Сообщение</label>
                <textarea
                  className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  name='message'
                  placeholder='Ваше сообщение'
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Кнопка отправки */}
              <button
                className='bg-primary text-primary-foreground hover:bg-primary/90 w-full h-10 px-4 py-2 rounded-md font-display'
                type='submit'
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>

        {/* Карта */}
        <div className='mb-16'>
          <h2 className='text-2xl font-display mb-10'>Как наc найти</h2>
          <div className='aspect-video w-full bg-muted rounded-lg overflow-hidden'>
            <iframe
              src="https://www.google.com/maps?q=Баляева+36,Владивосток&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title='Google Map'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
