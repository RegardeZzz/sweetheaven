import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import ordersApi from "../api/ordersApi";
import Loading from '../components/Loading';



const Profile = () => {
  const navigate = useNavigate();
  const [loadingOrders, setLoadingOrders] = useState(false);
  const token = localStorage.getItem('access');
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (activeTab === "orders" && token) {
      setLoadingOrders(true);
      ordersApi.getOrders(token)
        .then((res) => setOrders(res.data))
        .catch(console.error)
        .finally(() => setLoadingOrders(false));
    }
  }, [activeTab, token]);

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });



  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    authApi.getProfile(token)
      .then(setUser)
      .catch((err) => {
        console.error('Ошибка загрузки профиля:', err);
        navigate('/login');
      });
  }, [token,navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await authApi.updateProfile(token, user);
      alert('Профиль успешно обновлён ');
    } catch (error) {
      console.error('Ошибка обновления:', error);
      alert('Ошибка при сохранении данных');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert('Пароли не совпадают');
    }

    try {
      await authApi.changePassword(token, {
        current_password: passwords.currentPassword,
        new_password: passwords.newPassword,
      });
      alert('Пароль успешно обновлён');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка при смене пароля');
    }
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-display mb-8'>Личный кабинет</h1>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
          <div className='md:col-span-3'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='flex flex-col xs:flex-row items-center xs:items-start gap-3 xs:gap-4 text-center xs:text-left break-words'>
                <div className='rounded-full bg-primary/10 h-16 w-16 flex items-center justify-center text-primary text-xl font-bold'>
                  {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                </div>
                <div>
                  <h2 className='font-semibold'>{user.first_name} {user.last_name}</h2>
                  <p className='text-sm text-muted-foreground'>{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='md:col-span-9'>
            <div className='mb-6 flex flex-wrap gap-2'>
              <button
                onClick={() => setActiveTab("personal")}
                className={`px-3 py-2 rounded font-display ${activeTab === 'personal' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
              >
                Личные данные
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-2 rounded font-display ${activeTab === 'orders' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
              >
                Статус заказов
              </button>
            </div>

            {activeTab === "personal" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-display mb-4">Личная информация</h2>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first_name" className="text-sm font-medium leading-none text-primary">Имя</label>
                        <input
                          id="first_name"
                          value={user.first_name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last_name" className="text-sm font-medium leading-none text-primary">Фамилия</label>
                        <input
                          id="last_name"
                          value={user.last_name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-primary">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-primary">Телефон</label>
                      <input
                        id="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 font-display">
                      Сохранить изменения
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-display mb-4">Изменить пароль</h2>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-sm font-medium leading-none text-primary">Текущий пароль</label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium leading-none text-primary">Новый пароль</label>
                      <input
                        id="newPassword"
                        type="password"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium leading-none text-primary">Подтвердите пароль</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 font-display">
                      Изменить пароль
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4">
                {loadingOrders ? (
                  <Loading />
                ) : orders.length === 0 ? (
                  <p>Заказы отсутствуют</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border p-4 rounded">
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-600">
                          Дата: {new Date(order.created_at).toLocaleString()}
                        </div>
                        <div className="text-sm font-semibold">
                          {order.status === "processing" ? "Оформление" : "Завершен"}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <div>
                              <div className="font-medium">{item.product_name}</div>
                              <div className="text-sm text-gray-500">
                                x{item.quantity} — {item.price} ₽
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 font-semibold">Итого: {order.total_price} ₽</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
