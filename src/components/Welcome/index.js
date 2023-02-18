import React, { useState, Fragment, useEffect }  from 'react'
import Logout from '../Logout'
import Quiz from '../Quiz'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, user } from '../Firebase/firebaseConfig'
import { getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

const [userSession, setUserSession] = useState(null);
const [userData, setUserData] = useState({});

const navigat = useNavigate();

useEffect(() => {
    const listener = onAuthStateChanged(auth, user => {
       user ? setUserSession(user) : navigat('/')
    })

    if (!!userSession){

        const colRef = user(userSession.uid);

        getDoc(colRef)
        .then(snapshot => {
            if(snapshot.exists()){
                const docData = snapshot.data();
                console.log(docData);
                console.log(snapshot);
                setUserData(docData);
            }
        })
        .catch( error => {
            console.log(error);
        })
       

    }
    return listener();
}, [userSession])
    

return userSession === null ? (
<Fragment>
<div className='loader'></div>
<p>Loading...</p>
</Fragment>
) : (
      <div className='quiz-bg'>
          <div className='container'>
              <Logout />
              <Quiz userData={ userData } />
          </div>
      </div>
  )
}

export default Welcome