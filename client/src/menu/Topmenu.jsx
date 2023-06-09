import './../App.css';
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import bus from "./../image/bus.png";
import { Link } from "react-router-dom";

const TopMenu = () => {
  
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
            <Link to={`/Profil`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Profil
            </p>
            </button></Link>
            <Link to={`/DodawaniePracownikow`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Dodawanie Pracowników
            </p>
            </button></Link>
            <Link to={`/DodawaniePojazdow`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Dodawanie Pojazdów
            </p>
            </button></Link>
            <Link to={`/UsuwaniePracownikow`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Usuwanie pracowników
            </p>
            </button></Link>
            <Link to={`/DodawaniePrzystankow`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Dodawanie przystanków
            </p>
            </button></Link>
            <Link to={`/UsuwaniePojazdow`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Usuwanie Pojazdow
            </p>
            </button></Link>
        </div>
        <div className='nawigacja'>
            <Link to={`/UsuwaniePrzystankow`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Usuwanie Przystankow
            </p>
            </button></Link>
            <Link to={`/DodawanieTras`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Dodawanie Tras
            </p>
            </button></Link>
            <Link to={`/UsuwanieTras`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Usuwanie Tras
            </p>
            </button></Link>
            <Link to={`/DodawanieLinii`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              DodawanieLinii
            </p>
            </button></Link>
            <Link to={`/Linie`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Linie
            </p>
            </button></Link>
            <Link to={`/WyszukiwanieTras`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
               Wyszukiwarka Tras
            </p>
            </button>
            </Link>
        </div>
    </div>
  );
};

export default TopMenu;