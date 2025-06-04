import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const LoginPage = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogin = async (e) =>{
        e.preventDefault()
        const form = new FormData(e.target);

        const data = {
            email: form.get('email'),
            password: form.get('password')
        };

        try {
            const res = await authApi.login(data);

            localStorage.setItem('access', res.access);
            localStorage.setItem('refresh', res.refresh);

            const profile = await authApi.getProfile(res.access);
            localStorage.setItem('user', JSON.stringify(profile));

            navigate('/profile');
            } catch (err) {
            console.error('Ошибка при входе', err);
            setError('Неверный email или пароль');
        }
    };

  return (
    <div className='min-h-screen flex flex-col'>
        <div className=' flex-grow flex items-center justify-center py-12 px-4'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-lg shadow-lg p-8'>
                    <div className='text-center mb-8'>
                        <h1 className='text-2xl font-display text-primary'>Войти в аккаунт</h1>
                        <p className='text-muted-foreground'>Введите свои данные</p>
                    </div>

                    <form className='space-y-6' onSubmit={handleLogin}>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium leading-none text-primary'>Email:</label>
                            <input className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                type='text'
                                name='email'
                                placeholder='Email'
                                required
                            ></input>
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium leading-none text-primary'>Пароль:</label>
                            <input className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                type='password'
                                name='password'
                                placeholder='*********'
                                required
                            ></input>
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <button className=' bg-primary text-primary-foreground hover:bg-primary/90 w-full h-10 px-4 py-2 rounded-md font-display'>
                                Войти        
                        </button>
                    </form>

                    <div className='mt-6 pt-4 text-center border-t'>
                        <p className='text-sm text-muted-foreground'>Нет аккаунта?
                            <Link to='/register' className='font-medium text-primary hover:underline'>Зарегистрироваться</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage;
