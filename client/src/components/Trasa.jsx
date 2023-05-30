import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import NormalMenu from "../menu/Normalmenu";
import TopMenu from "../menu/Topmenu";

const Trasa = () => {
  const [tracks, setTracks] = useState([]);

  const navigate = useNavigate()
  const location = useLocation()
  const trackId = location.pathname.split("/")[2]
  console.log(trackId)

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tracks/"+trackId);
        setTracks(res.data);
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(e)
      await axios.post("http://localhost:8800/tickets/"+trackId+'/'+userId);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>    
      <TopMenu />
          <div className="formusun">
          <div key={track.id} className="track">
            <h2>Start: {track.start}</h2>
            <h2>Cel: {track.cel}</h2>
            <h2>Godzina startu: {track.godz_startu}</h2>
            <h2>Godzina końca: {track.godz_konca}</h2>
            <h2>id pojazdu: {track.pojazdy_id}</h2>
            <h2>id pracownika: {track.pracownicy_id}</h2>
            <h2>Dni kursowania: {track.dni_kursowania}</h2>

            <button onClick={handleClick}>Kup bilet
            </button>
            <button onClick={handleClick}>Kup bilet miesięczny
            </button>

      {error && "Something went wrong!"}

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

export default Trasa;