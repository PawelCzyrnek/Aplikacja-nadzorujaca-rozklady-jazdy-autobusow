import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Trasa = () => {
  const [tracks, setTracks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const trackId = location.pathname.split('/')[2];



  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/trasy/search?text=${searchText}`);
      if (Array.isArray(res.data)) {
        setTracks(res.data);
      } else {
        setTracks([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  
  

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;
  const [error, setError] = useState(false);
  const [track, setTrackss] = useState({
    id: '',
    user_id: '',
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
      await axios.post(`http://localhost:8800/tickets/${trackId}/${userId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>
      <TopMenu />
        <div className="formusun">
        <h1>Wyszukiwarka tras</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Wyszukaj..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit">Wyszukaj</button>
          </form>
          {Array.isArray(tracks) && tracks.length > 0 ? (
            tracks.map((track) => (
              <div key={track.id} className="track">
                <h2>Start: {track.start}</h2>
                <h2>Cel: {track.cel}</h2>
                <h2>Godzina startu: {track.godz_startu}</h2>
                <h2>Godzina końca: {track.godz_konca}</h2>
                <h2>Pojazd: {track.id_no}</h2>
                 <h2>Kierowca: {track.name+" "+track.surename}</h2>
                <h2>Dni kursowania: {track.dni_kursowania}</h2>
                <button>
            <Link
                to={`/Trasa/${track.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Trasa
              </Link>
            </button>
              </div>
            ))
          ) : (
            <p>Nie znaleziono trasy</p>
          )}
          {error && "Coś poszło nie tak!"}
          <div>
        <h2>LEGENDA</h2>
        <p>F – kursuje od poniedziałku do piątku</p>
        <p>6 – kursuje w sobotę</p>
        <p>7 – kursuje w niedziele</p>
        <p>S – kursuje w dniach nauki szkolnej</p>
      </div>
        </div>
      </center>
    </div>
  );
}else{
    return (
      <div className="main">
        <center>
        <NormalMenu />
        <div className="formusun">
        {currentUser?(<div>
          <form onSubmit={handleSearch}>
          <h1>Wyszukiwarka tras</h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit">Wyszukaj</button>
          </form>
          {Array.isArray(tracks) && tracks.length > 0 ? (
            tracks.map((track) => (
              <div key={track.id} className="track">
                <h2>Start: {track.start}</h2>
                <h2>Cel: {track.cel}</h2>
                <h2>Godzina startu: {track.godz_startu}</h2>
                <h2>Godzina końca: {track.godz_konca}</h2>
                <h2>Pojazd: {track.id_no}</h2>
                <h2>Kierowca: {track.name+" "+track.surename}</h2>
                <h2>Dni kursowania: {track.dni_kursowania}</h2>
                <button>
            <Link
                to={`/Trasa/${track.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Trasa
              </Link>
            </button>
              </div>
            ))
          ) : (
            <p>Nie znalezziono trasy</p>
          )}
          {error && "Coś poszło nie tak!"}
          <div>
        <h2>LEGENDA</h2>
        <p>F – kursuje od poniedziałku do piątku</p>
        <p>6 – kursuje w sobotę</p>
        <p>7 – kursuje w niedziele</p>
        <p>S – kursuje w dniach nauki szkolnej</p>
      </div>
          </div>) : null}</div>
          </center>
      </div>
    );
  }
  };

export default Trasa;
