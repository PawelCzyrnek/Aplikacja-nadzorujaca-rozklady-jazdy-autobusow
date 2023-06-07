import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Tracks = () => {
    const [stops, setStops] = useState([]);
  const [tracks, setTracks] = useState([]);
  const location = useLocation()
  const liniaId = location.pathname.split("/")[2]
  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/trasy/"+liniaId);
        setTracks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTracks();
  }, []);
 
  useEffect(() => {
    const fetchAllStops = async () => {
      try {
        const res = await axios.get("http://localhost:8800/przystanki/"+liniaId);
        setStops(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStops();
  }, []);

  console.log(tracks);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/tracks/"+id);
      window.location.reload()
    } catch(err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;

  const [error,setError] = useState(false)

  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>    
      <TopMenu />
          <div className="formusun">
        {tracks.map((track) => (
          <div key={track.id} className="track">
            <h2>Start: {track.start}</h2>
            <h2>Cel: {track.cel}</h2>
            <h2>Godzina startu: {track.godz_startu}</h2>
            <h2>Godzina końca: {track.godz_konca}</h2>
            <h2>id pojazdu: {track.pojazdy_id}</h2>
            <h2>id pracownika: {track.pracownicy_id}</h2>
            <h2>Dni kursowania: {track.dni_kursowania}</h2>
            <button className="delete" onClick={() => handleDelete(track.id)}>Usuń</button>
            <button className="update">
            <Link
                to={`/EdytowanieTras/${track.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Edytuj
              </Link>
            </button>
            <button>
            <Link
                to={`/Trasa/${track.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Trasa
              </Link>
            </button>
            <button>
            <Link
                to={`/WyswietlaniePrzystankow/${track.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Dodaj przystanek
              </Link>
            </button>
          </div>
        ))}

{stops.map((przystanek, index) => (
     <div className="przystanekTrasy"><div key={index} className="stop">
      <h2>Nazwa przystanku: {przystanek.nazwa}</h2>
      <h2>Nazwa miasta: {przystanek.nazwa_miasta}</h2>

      
      {error && "Something went wrong!"}
    </div></div>
  ))}
        </div>
      </center>
    </div>
  );  
}else{
  return (
    <div className="main">
      <center>
      <NormalMenu />
        </center>
    </div>
  );
}
};

export default Tracks;