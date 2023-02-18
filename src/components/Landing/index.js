import React, { useRef, useEffect, useState, Fragment } from 'react'
import { NavLink } from 'react-router-dom';

const Landing = () => {

  const [btn, setBtn] = useState(false);

  const refWolverine = useRef(null);

  const setLeftImg =() =>{
    refWolverine.current.classList.add("leftImg");
  }

  const setRightImg =() =>{
    refWolverine.current.classList.add("rightImg");
  }

  const removeLtImg =() =>{
    if(refWolverine.current.classList.contains("leftImg")){
      refWolverine.current.classList.remove("leftImg");
    } else if (refWolverine.current.classList.contains("rightImg")){
      refWolverine.current.classList.remove("rightImg");
    }
    
  }


  useEffect(() => {

    refWolverine.current.classList.add("startingImg");

    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true)
    }, 1000);

  }, [])

  const displayBtn = btn && (
    <>
      <div onMouseOver={setLeftImg} onMouseOut={removeLtImg} className='leftBox'>
        <NavLink to="/signup" className='btn-welcome'>Inscription</NavLink>
      </div>
      <div onMouseOver={setRightImg} onMouseOut={removeLtImg} className='rightBox'>
        <NavLink to="/login" className='btn-welcome'>Connexion</NavLink>
      </div>
    </>)
  return (
    <main ref={refWolverine} className='welcomePage'>
      {displayBtn}
    </main>
  )
}

export default Landing