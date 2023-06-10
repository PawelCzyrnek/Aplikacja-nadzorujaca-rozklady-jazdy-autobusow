import axios from "axios";
import home from "./../image/BamBus.png";
import React from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Update = () => {
  const [track, setTracks] = useState({
    start: "",
    cel: "",
    godz_startu: "",
    godz_konca: "",
    pojazdy_id: "",
    pracownicy_id: "",
    dni_kursowania: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const trackId = location.pathname.split("/")[2]

  console.log(location.pathname.split("/")[2])

  const handleChange = (e) => {
    setTracks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/tracks/"+ trackId, track);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="main">
      <center>    
      <TopMenu />
    <div className="form">
      <h1>Edytowanie tras</h1>
      <input
        type="text"
        placeholder="Start"
        name="start"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cel"
        name="cel"
        onChange={handleChange}
      />
      <input
        type="time"
        placeholder="Godzina startu"
        name="godz_startu"
        onChange={handleChange}
      />
      <input
        type="time"
        placeholder="Godzina końca"
        name="godz_konca"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="id pojazdu"
        name="pojazdy_id"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="id pracownika"
        name="pracownicy_id"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Dni kursowania"
        name="dni_kursowania"
        onChange={handleChange}
      />

      <button onClick={handleClick}>Edytuj</button>
      {error && "Something went wrong!"}
      <button><Link to="/">Strona główna</Link></button>
    </div>
    </center>
    </div>
  );
};

export default Update;