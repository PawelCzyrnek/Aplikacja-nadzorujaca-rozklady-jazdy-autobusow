import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profil = () => {

  const { currentUser,logout } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
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
            <button>
            <p className="link">
            <a href='/UsuwaniePrzystankow'>Usuwanie Przystankow</a>
            </p>
            </button>
        </div>
        <div className='nawigacja'>
            <button>
            <p className="link">
            <a href='/EdytowaniePrzystankow'>Edytowanie Przystankow</a>
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
        </div>
        <div className="form">
        <h1>Profil</h1>
      <h2>{currentUser.name} {currentUser.surename}</h2>
      <h2>Rola: {currentUser.rola_id}</h2>
      <button><Link to="/">Strona główna</Link></button>
      <button><Link to="/EdytowanieProfilu">Edytuj profil</Link></button>
      <button><Link to="/ZmianaHasla">Zmień hasło</Link></button>
    </div>
      </center>
    </div>
  );
  }else{
    return (
      <div className="main">
        <center>
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
            <div className="form">
      <h1>Profil</h1>
      <h2>{currentUser.name} {currentUser.surename}</h2>
      <h2>Rola: {currentUser.rola_id}</h2>
      <button><Link to="/">Strona główna</Link></button>
      <button><Link to="/EdytowanieProfilu">Edytuj profil</Link></button>
      <button><Link to="/ZmianaHasla">Zmień hasło</Link></button>
    </div>
          </center>
      </div>
    );
  }
};

export default Profil;