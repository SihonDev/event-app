import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Birthday from './pages/Birthday'
import Circumcision from './pages/Circumcision'
import BarMitzva from './pages/BarMitzva'
import Wedding from './pages/Wedding'
import Suggestion from './pages/Suggestion'
import Profile from './pages/Profile'

function App() {
  
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/wedding' element={<Wedding />} />
            <Route path='/circumcision' element={<Circumcision />} />
            <Route path='/barmitzva' element={<BarMitzva />} />
            <Route path='/birthday' element={<Birthday />} />
            <Route path='/ulam' element={<Suggestion />} />
            <Route path='/food' element={<Suggestion />} />
            <Route path='/salon' element={<Suggestion />} />
            <Route path='/attraction' element={<Suggestion />} />
            <Route path='/clouth' element={<Suggestion />} />
            <Route path='/photographer' element={<Suggestion />} />
            <Route path='/placedesign' element={<Suggestion />} />
            <Route path='/mohel' element={<Suggestion />} />
            <Route path='/activebar' element={<Suggestion />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
