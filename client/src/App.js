import {Route,Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Categories from './pages/categories/Categories';
import ProductDetail from './pages/productDetail/ProductDetail';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { fetchCategories } from './redux/slices/categorySlice';
import Redirect from './components/Redirect/Redirect';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(fetchCategories());
  },[])


  return <div className="app">
  <Nav/>
  <Routes>
    <Route path='/' element={<Home/>} /> 
    <Route path='/category/:categoryId?' element={<Categories/>}/>
    <Route path='/products/:productId' element={<ProductDetail/>}/>
    <Route path='/payments/:status' element={<Redirect/>}/>
  </Routes>
  <Footer/>
  </div>;
}

export default App;
