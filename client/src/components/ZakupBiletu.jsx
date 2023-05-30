import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/authContext';

const Tracks = () => {
  const [tracks, setTracks] = useState([]);


  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tracks");
        setTracks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTracks();
  }, []);

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

            <button>
            <Link
                to={`/Trasa/${track.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Wyswietl trase
              </Link>
            </button>
            
              
      {error && "Something went wrong!"}
            
          </div>
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