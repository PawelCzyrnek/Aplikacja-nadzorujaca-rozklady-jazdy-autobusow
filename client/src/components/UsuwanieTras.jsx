import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

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

  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>    
      <TopMenu />
          <div className="formusun">
          <h1>Trasy</h1>
        {tracks.map((track) => (
          <div key={track.id} className="track">
            <h2>Start: {track.start}</h2>
            <h2>Cel: {track.cel}</h2>
            <h2>Godzina startu: {track.godz_startu}</h2>
            <h2>Godzina końca: {track.godz_konca}</h2>
            <h2>Pojazd: {track.id_no}</h2>
            <h2>Kierowca: {track.name+" "+track.surename}</h2>
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
        </center>
    </div>
  );
}
};

export default Tracks;