import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';
import '../../App.css';
import { IconContext } from 'react-icons';

function App() {
  return (
    <div>

<IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <Header />

      <BrowserRouter>

      <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgetpassword" element={<ForgetPassword/>} />
      <Route path="*" element={<ErrorPage />} />
      </Routes>

      </BrowserRouter>
      
      <Footer />
      
      </IconContext.Provider>


        
    </div>
  );
}

export default App;
