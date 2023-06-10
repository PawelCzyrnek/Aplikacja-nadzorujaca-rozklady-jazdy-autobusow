

import React, { useContext } from "react";
import home from "./../image/BamBus.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

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

  const [czas, setCzas] = useState({
    czas: "",
  });

  const handleChange = (e) => {
    setCzas((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(czas);
  };

  const handleClick = async (stopId) => {
  try {
    const res = await axios.post(`http://localhost:8800/stops/${trackId}`, { id: stopId, czas: czas.czas });
    navigate("/");
  } catch (err) {
    console.log(err);
    setError(true);
  }
};

  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
      <TopMenu />
       <div className="formusun">
       <h2>Czas dotarcia na przystanek: <input
        className="czas"
        type="TIME"
        name="czas"
        onChange={handleChange}
      /></h2>
  {stops.map((przystanek) => (
    <div key={przystanek.id} className="stop">
      <h2>Nazwa przystanku: {przystanek.nazwa}</h2>
      <h2>Nazwa miasta: {przystanek.nazwa_miasta}</h2>

      <button onClick={() => handleClick(przystanek.id)}>Dodaj</button>
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