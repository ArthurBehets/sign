import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Sign from './pages/Sign'
import Error from './pages/Error'
import MyNavbar from './components/Navbar/Navbar'
import Category from './pages/Category'



ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter className="all">
          <MyNavbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Sign" element={<Sign />} />
              <Route exact path = "/Category/:categoryId" element={<Category />} />
              <Route path='*' exact={true} element={<Error />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
document.getElementById('root')
)