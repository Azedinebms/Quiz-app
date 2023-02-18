import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { setDoc } from 'firebase/firestore';
import { auth, user } from '../Firebase/firebaseConfig';

const Signup = (props) => {

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmerpassword: ''
  }

  const [loginData, setLoginData] = useState(data);

  const [error, setError] = useState('');

  const { pseudo, email, password, confirmerpassword } = loginData;

  const navigate = useNavigate();

  const btn = pseudo === '' || email === '' || password === '' || confirmerpassword === '' || password !== confirmerpassword ? <button disabled>Inscription</button> : <button>Inscription</button>

  const handleChang = e => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    createUserWithEmailAndPassword(auth, email, password)
      .then(authUser =>{
        return setDoc(user(authUser.user.uid), {
          pseudo,
          email
        });
      }

      )
      .then(user => {
        setLoginData({ ...data });
        navigate('/welcome');
      })
      .catch(error => {
        setError(error);
        setLoginData({ ...data });
      })
  }

  const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftSignup'>

        </div>
        <div className='formBoxRight'>
          <div className='formContent'>
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className='inputBox'>
                <input onChange={handleChang} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                <label htmlFor="pseudo">Pseudo</label>
              </div>

              <div className='inputBox'>
                <input onChange={handleChang} value={email} type="text" id="email" autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>

              <div className='inputBox'>
                <input onChange={handleChang} value={password} type="password" id="password" autoComplete="off" required />
                <label htmlFor="password">Mot de pass</label>
              </div>

              <div className='inputBox'>
                <input onChange={handleChang} value={confirmerpassword} type="password" id="confirmerpassword" autoComplete="off" required />
                <label htmlFor="confirmerpassword">Confirmer le mot de pass</label>
              </div>
              {btn}
            </form>
            <div className='linkContainer'>
              <Link className='simpleLink' to="/login">Déjà inscrit? Connecter-vous.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup