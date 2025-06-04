import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target);

        const data = {
            email: form.get('email'),
            first_name: form.get('firstname'),
            last_name: form.get('lastname'),
            phone: form.get('phone'),
            password: form.get('password'), 
        };

        try{
             const res = await axios.post('http://localhost:8000/api/register/',data);
            localStorage.setItem('user', JSON.stringify({ username: res.data.username }));
            navigate('/login');
        }catch(err) {
            console.error('Ошибка при регистрации',err);
        }
    };

  return (
    <div className='min-h-screen flex flex-col'>
        <div className='flex-grow flex items-center justify-center py-12 px-4'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-lg shadow-lg p-8'>
                    <div className='text-center mb-8' >
                        <h1 className='text-2xl font-display mb-2 text-primary'>Создать аккаунт</h1>
                        <p className='text-muted-foreground'>Заполните форму для регистрации</p>
                    </div>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label className='text-sm font-display leading-none  text-primary'>Имя:</label>
                                <input className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                    type='text'
                                    name='firstname'
                                    placeholder='Имя'
                                    required
                                ></input>
                            </div>
                            <div className='space-y-2'>
                                <label className='text-sm font-display leading-none  text-primary'>Фамилия:</label>
                                <input className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                    type='text'
                                    name='lastname'
                                    placeholder='Фамилия'
                                    required
                                ></input>
                            </div>
                        </div>
                            <div className='space-y-2'>
                                <label className='text-sm font-display leading-none text-primary'>Email:</label>
                                <input className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                    type='text'
                                    name='email'
                                    placeholder='Email'
                                    required
                                ></input>
                            </div>
                            <div className='space-y-2'>
                                <label className='text-sm font-display leading-none text-primary'>Телефон:</label>
                                <input className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                    type='text'
                                    name='phone'
                                    placeholder='7-(XXX)-XX-XX'
                                    required
                                ></input>
                            </div>
                            <div className='space-y-2'>
                                <label className='text-sm font-display leading-none text-primary'>Пароль:</label>
                                <div className='relative'>
                                    <input className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                        type='password'
                                        name='password'
                                        placeholder='*********'
                                        required
                                    ></input>
                                </div>
                            </div>
                            <button className=' bg-primary text-primary-foreground hover:bg-primary/90 w-full h-10 px-4 py-2 rounded-md font-display'>
                                Зарегистрироваться        
                            </button>
                    </form>

                    <div className='mt-6 pt-4 text-center border-t'>
                        <p className='text-sm text-muted-foreground'>Уже есть аккаунт? {" "} 
                            <Link to='/login' className='font-medium text-primary hover:underline'>Войти</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage
