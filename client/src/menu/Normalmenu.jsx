import './../App.css';
import home from "./../image/BamBus.png";
import bus from "./../image/bus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { Link } from "react-router-dom";

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
          <Link to={`/rejestracja`}
              style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Rejestracja
            </p>
            </button></Link>
            {currentUser?(
            <Link onClick={logout}
              style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Wylogowywanie
            </p>
            </button></Link>) : 
            <Link to={`/login`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Login
            </p>
            </button></Link>}
            {currentUser?(<div><Link to={`/Profil`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Profil
            </p>
            </button></Link><Link to={`/WyszukiwanieTras`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
               Wyszukiwarka Tras
            </p>
            </button>
            </Link></div>) : null}
              </div>
    </div>
  );
};

export default NormalMenu;