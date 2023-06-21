import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/authContext';
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

const [tracks, setOLDTrack] = useState([]);
  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tracks/"+trackId);
        setOLDTrack(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTracks();
  }, []);
 

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

  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/kierowcy");
        setDrivers(response.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchDrivers();
  }, []);
  //lista pojazdów
  const [vehicleIds, setVehicles] = useState([]);
  useEffect(() => {
    const fetchVehicleIds = async () => {
      try {
        const response = await axios.get("http://localhost:8800/tracki");
        setVehicles(response.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchVehicleIds();
  }, []);

  const { currentUser } = useContext(AuthContext);
  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>    
      <TopMenu />
    <div className="form">
      <h1>Edytowanie tras</h1>
      {tracks.map((trasa) => (<div>
      <table className="tabelawaska"><tr><td><Link>Początek trasy:</Link></td><td>
      <input
        type="text"
        placeholder={trasa.start}
        name="start"
        onChange={handleChange}
      />
      </td>
      <td><Link>Koniec trasy:</Link></td><td>
      <input
        type="text"
        placeholder={trasa.cel}
        name="cel"
        onChange={handleChange}
      />
      </td></tr><tr>
      <td><Link>Czas rozpoczęcia:</Link></td><td>
      <input
        type="time"
        placeholder="godzina startu"
        name="godz_startu"
        onChange={handleChange}
      />
      </td>
      <td><Link>Czas zakończenia:</Link></td><td>
      <input
        type="time"
        name="godz_konca"
        onChange={handleChange}
      />
      </td></tr><tr>
      <td><Link>Pojazd:</Link></td><td>
      <select type="number" name="pojazdy_id" onChange={handleChange}>
        {vehicleIds.map((pojazd) => (
          <option key={pojazd.id} value={pojazd.id}>{pojazd.id}</option>
        ))}
      </select>
      </td>
      <td><Link>Kierowca:</Link></td><td>
      <select type="number" name="pracownicy_id" onChange={handleChange}>
        {drivers.map((kierowca) => (
          <option key={kierowca.id} value={kierowca.id}>{kierowca.id}</option>
        ))}
      </select>
      </td>
      </tr></table>
      <div>
      <Link>Dni kurowania:</Link>
      <select type="text" name="dni_kursowania" onChange={handleChange}>
      <option>F</option>
      <option>F 6</option>
      <option>F 6 7</option>
      <option>6 7</option>
      <option>6</option>
      <option>7</option>
      <option>S</option>
      <option>S 6</option>
      <option>S 7</option>
      <option>S 6 7</option>
	    </select></div>
      </div>))}
      <button onClick={handleClick}>Edytuj</button>
      {error && "Something went wrong!"}
      <button><Link to="/">Strona główna</Link></button>
      <div>
        <h2>LEGENDA</h2>
        <p>F – kursuje od poniedziałku do piątku</p>
        <p>6 – kursuje w sobotę</p>
        <p>7 – kursuje w niedziele</p>
        <p>S – kursuje w dniach nauki szkolnej</p>
      </div>
      <div>
        <h2>LEGENDA PRACOWNIKÓW</h2>
          {drivers.map((kierowca) => (
          <div key={kierowca.id}>
            <p>{kierowca.id} - {kierowca.name+" "+kierowca.surename}</p>
          </div>
        ))}
        <h2>LEGENDA POJAZDÓW</h2>
          {vehicleIds.map((pojazd) => (
          <div key={pojazd.id}>
            <p>{pojazd.id} - {pojazd.id_no}</p>
          </div>
        ))}
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

export default Update;