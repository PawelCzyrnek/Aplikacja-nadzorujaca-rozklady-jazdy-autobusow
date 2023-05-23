import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ZmianaHasla = () => {
  const [user, setUser] = useState({
    shaslo: "",
    nhaslo: "",
    nhaslo2: "",
  });
  const [err,setError] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;

  console.log(currentUser.id)

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        await axios.get("http://localhost:8800/haslo/"+ userId, user);
        try {
            await axios.put("http://localhost:8800/haslo/"+ userId, user);
            navigate("/Profil");
          } catch (err) {
            console.log(err);
            setError(true)
          }
      } catch (err) {
        console.log(err);
        setError(true)
      }
  };

  const { logout } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>    
      <div className='NazwaStrony'>
      <img className='imgh' src={home} alt="home"/>
      <div className='napis'>
      BamBus
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
            <a href='/UsuwaniePracownikow'>Zarządzanie pracownikami</a>
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
      <h1>Edytowanie Profilu</h1>
      <input
        type="password"
        placeholder="Stare hasło"
        name="shaslo"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Nowe hasło"
        name="nhaslo"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Powtórz hasło"
        name="nhaslo2"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Edytuj</button>
      {err && "Something went wrong!"}
      <button><Link to="/Profil">Profil</Link></button>
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
    <div className="form">
      <h1>Zmiana hasła</h1>
      <input
        type="text"
        placeholder="Stare hasło"
        name="shaslo"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Nowe hasło"
        name="nhaslo"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Powtórz hasło"
        name="nhaslo2"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Zmień</button>
      {err && "Hasła się nie zgadzają!"}
      <button><Link to="/Profil">Profil</Link></button>
    </div>
        </center>
    </div>
  );
}
};

export default ZmianaHasla;
