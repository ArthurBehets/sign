import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Sign from './pages/Sign'
import Error from './pages/Error'
import MyNavbar from './components/Navbar'
import Category from './pages/Category'
import Footer from './components/Footer'
import Quizz from './pages/Quizz'
import List from './pages/List'
import Connection from './pages/Connection'
import Inscription from './pages/Inscription'
import CreateSign from './pages/CreateSign.jsx'


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter className="all">
          <MyNavbar />
          <Routes>
              <Route exact path = "/" element={<Home />} />
              <Route exact path = "/Sign/:signId" element={<Sign />} />
              <Route exact path = "/Category/:categoryId" element={<Category />} />
              <Route exact path = "/Quizz/:category" element={<Quizz />} />
              <Route excat path = "/List/:list" element={<List />} />
              <Route excat path = "/Connection" element={<Connection />} />
              <Route excat path = "/Inscription" element={<Inscription />} />
              <Route excat path = "/CreateSign" element={<CreateSign />} />
              <Route path='*' exact={true} element={<Error />} />
          </Routes>
          <div className='popup' id='popup'></div>
          <Footer />
      </BrowserRouter>
  </React.StrictMode>,
document.getElementById('root')
)