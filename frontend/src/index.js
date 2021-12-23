import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Sign from './pages/Sign'
import Error from './pages/Error'
import MyNavbar from './components/Navbar'
import Category from './pages/Category'
import Footer from './components/Footer'



ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter className="all">
          <MyNavbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Sign/:signId" element={<Sign />} />
              <Route exact path = "/Category/:categoryId" element={<Category />} />
              <Route path='*' exact={true} element={<Error />} />
          </Routes>
          <Footer />
      </BrowserRouter>
  </React.StrictMode>,
document.getElementById('root')
)