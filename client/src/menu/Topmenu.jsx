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
            <button>
            <p className="link">
            <a href='/Profil'>Profil</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/DodawaniePracownikow'>Dodawanie Pracowników</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/DodawaniePojazdow'>Dodawanie Pojazdów</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/UsuwaniePracownikow'>Usuwanie pracowników</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/DodawaniePrzystankow'>Dodawanie przystanków</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/UsuwaniePojazdow'>Usuwanie Pojazdow</a>
            </p>
            </button>
        </div>
        <div className='nawigacja'>
            <button>
            <p className="link">
            <a href='/UsuwaniePrzystankow'>Usuwanie Przystankow</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/DodawanieTras'>Dodawanie Tras</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/UsuwanieTras'>Usuwanie Tras</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/DodawanieLinii'>DodawanieLinii</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/Linie'>Linie</a>
            </p>
            </button>
            <Link
                to={`/WyszukiwanieTras`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
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