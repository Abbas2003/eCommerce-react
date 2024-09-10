import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Auth from './pages/Auth'
import SignUp from './pages/Auth/Signup'
import SignIn from './pages/Auth/Signin'

function App() {
 
  return (
   <BrowserRouter>
   <Header />
    <Routes>
      
      <Route path='/' element={<Home />} /> 
      <Route path='/products' element={<Products />} /> 
      <Route path='/products/:id' element={<ProductDetail />} /> 

      <Route path='/auth'>
        <Route index element={<Auth />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Route>

    </Routes>
   </BrowserRouter>
  )
}

export default App;