import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [trasa, setUser] = useState({
    start: "",
    cel: "",
    godz_startu: "",
    godz_konca: "",
    pojazdy_id: "",
    pracownicy_id: "",
    dni_kursowania: "",
    
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/tracks", trasa);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

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
      <h1>Dodawanie tras</h1>
      <input
        type="text"
        placeholder="start"
        name="start"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cel"
        name="cel"
        onChange={handleChange}
      />
      <input
        type="time"
        placeholder="godzina startu"
        name="godz_startu"
        onChange={handleChange}
      />
      <input
        type="time"
        placeholder="godzina końca"
        name="godz_konca"
        onChange={handleChange}
      />

      <input
        type="number"
        placeholder="id pojazdu"
        name="pojazdy_id"
        onChange={handleChange}
      />  

      <input
        type="number"
        placeholder="id pracownika"
        name="pracownicy_id"
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="dni kursowania"
        name="dni_kursowania"
        onChange={handleChange}
      />

      <button onClick={handleClick}>Dodaj</button>
      {error && "Something went wrong!"}
      <button><Link to="/">Strona główna</Link></button>
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
          </div>
        </center>
    </div>
  );
}
};

export default Add;