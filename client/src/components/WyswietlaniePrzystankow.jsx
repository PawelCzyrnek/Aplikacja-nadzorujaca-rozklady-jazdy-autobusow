import React, { useContext } from "react";
import home from "./../image/BamBus.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/authContext';

const Tracks = () => {
    const [stops, setStops] = useState([]);

  const navigate = useNavigate()
  const location = useLocation()
  const trackId = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/stops");
        setStops(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTracks();
  }, []);



  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;

  const [error,setError] = useState(false)

 

  const [track, setTrackss] = useState({
    id: "",
    user_id: "",
  });



  const handleClick = async (stopId) => {
    try {
      const res = await axios.post(`http://localhost:8800/stops/${trackId}`, { id: stopId });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  
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
            <button>
            <p className="link">
            <a href='/login'>Login</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/Logout'>Wylogowywanie</a>
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
       <div className="formusun">
       {stops.map((przystanek) => (
  <div key={przystanek.id} className="stop">
    <h2>Nazwa przystanku: {przystanek.nazwa}</h2>
    <h2>Numer id miasta: {przystanek.miasto_id}</h2>

    <button onClick={() => handleClick(przystanek.id)}>Dodaj</button>
    {error && "Something went wrong!"}
  </div>
))}
        </div>
      </center>
    </div>
  );  
}

export default Tracks;