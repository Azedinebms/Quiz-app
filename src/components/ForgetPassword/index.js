import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';



const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState(null);
    const navigation= useNavigate();


    const handleSubmit = e => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setError(null);
            setSuccess(`Consultez votre ${email} pour chnager le mot de passe`);
            setTimeout(()=> {
                navigation('/login');
            }, 5000)
        })
        .catch(error => {
            setError(error);
            setEmail("");
        })
    }


    const disabled = email === "";


    return (
        <div className='signUpLoginBox'>
          <div className='slContainer'>
            <div className='formBoxLeftForget'>
    
            </div>
            <div className='formBoxRight'>
              <div className='formContent'>

                { error && <span>{error.message}</span> }
                { 
                success && <span style={{border:"1px solid green",background:"green",color:"white"}}>{success}</span>
                }

                <h2>Mot de passe oublié?</h2>
                <form onSubmit={handleSubmit}>
    
    
                  <div className='inputBox'>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="text" autoComplete="off" required />
                    <label htmlFor="email">Email</label>
                  </div>
    

                    <button disabled={disabled}>Récupérer</button>
               
                </form>
                <div className='linkContainer'>
                  <Link className='simpleLink' to="/login">Déjà inscrit!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ForgetPassword;
