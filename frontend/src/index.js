import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Sign from './pages/Sign'
import Error from './pages/Error'
import MyNavbar from './components/Navbar/Navbar'

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <MyNavbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Sign" element={<Sign />} />
              <Route path='*' exact={true} element={<Error />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
document.getElementById('root')
)