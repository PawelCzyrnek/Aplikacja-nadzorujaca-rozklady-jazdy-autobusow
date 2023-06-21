import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Tracks = () => {
    const [tracks, setTrasy] = useState([]);

  const navigate = useNavigate()
  const location = useLocation()
  const liniaId = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tracks");
        setTrasy(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTracks();
  }, []);

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;

  const [error,setError] = useState(false)

  const handleClick = async (trasaId) => {
  try {
    const res = await axios.post(`http://localhost:8800/tracks/${liniaId}`, { id: trasaId });
    navigate("/");
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
       <h1>Wybierz trasę aby dodać ją do linii</h1>
       {tracks.map((track) => (
          <div key={track.id} className="track">
            <h2>Start: {track.start}</h2>
            <h2>Cel: {track.cel}</h2>
            <h2>Godzina startu: {track.godz_startu}</h2>
            <h2>Godzina końca: {track.godz_konca}</h2>
            <h2>id pojazdu: {track.pojazdy_id}</h2>
            <h2>id pracownika: {track.pracownicy_id}</h2>
            <h2>Dni kursowania: {track.dni_kursowania}</h2>

      <button onClick={() => handleClick(track.id)}>Dodaj</button>
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