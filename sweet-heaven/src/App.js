import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import About from './pages/About';
import Error404 from './pages/Error404';
import Catalog from './pages/Catalog';
import RegisterPage  from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Contacts from './pages/Contacts';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Cart from './pages/Cart';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<MainPage/>} />
          <Route path='catalog' element={<Catalog/>} />
          <Route path='/product/:id' element={<ProductDetails/>} />
          <Route path="about" element={<About />} />
          <Route path='register' element={<RegisterPage/>} />
          <Route path='login' element={<LoginPage/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='contacts' element={<Contacts/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;