import './../App.css';
import home from "./../image/BamBus.png";
import bus from "./../image/bus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';

const NormalMenu = () => {
  
  const { currentUser,logout} = useContext(AuthContext);
  return (
    <div>
    <img className="przystanek" src={bus} alt="bus"/>
    <div className='NazwaStrony'>
        <img className='imgh' src={home} alt="home"/>
        <div className='napis'>
        BamBus
        </div>
        <div className="nazwaU">
        {currentUser?.name}
        </div>
        </div>
          <div className='nawigacja'>
              <button>
              <p className="link">
              <a href='/rejestracja'>Rejestracja</a>
              </p>
              </button>
              {currentUser?(
            <button>
            <p className="link">
            <a onClick={logout}>Wylogowywanie</a>
            </p>
            </button>) : 
            <button>
            <p className="link">
            <a href='/login'>Login</a>
            </p>
            </button>}
            {currentUser?(<button>
            <p className="link">
            <a href='/Profil'>Profil</a>
            </p>
            </button>) : null}
              </div>
    </div>
  );
};

export default NormalMenu;