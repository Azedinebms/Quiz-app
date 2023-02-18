import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [btn, setBtn] = useState(false);
const [error, setError] = useState('');
const navigate = useNavigate();

useEffect(() => {
  if (password.length > 5 && email !== ''){
    setBtn(true)
  } else if (btn){
    setBtn(false)
  }
}, [password, email, btn]);

const handlePassword = e => {
  setPassword(e.target.value);
}

const handleSubmit = e => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      setEmail('');
      setPassword('');
      navigate('/welcome', {replace:true});
    })
    .catch(error => {
      setError(error);
      setEmail('');
      setPassword('');
    })

}

const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftLogin'>

        </div>
        <div className='formBoxRight'>
          <div className='formContent'>
          {errorMsg}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>


              <div className='inputBox'>
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>

              <div className='inputBox'>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required />
                <label htmlFor="password">Mot de pass</label>
              </div>

            {
              <button 
              disabled={btn ? false : true }
              >Connexion</button>
              }
           
            </form>
            <div className='linkContainer'>
              <Link className='simpleLink' to="/signup">Nouveau sur Quiz App ? Inscrivez-vous maintenant.</Link>
              <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié?</Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login