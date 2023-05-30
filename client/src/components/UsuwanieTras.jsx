import React from "react";
import home from "./../image/BamBus.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
          </div>
        ))}
        </div>
      </center>
    </div>
  );  
};

export default Tracks;