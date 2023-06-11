import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Add = () => {
  const [trasa, setUser] = useState({
    start: "",
    cel: "",
    godz_startu: "",
    godz_konca: "",
    pojazdy_id: "",
    pracownicy_id: "",
    dni_kursowania: "",
    
  });
  const [error,setError] = useState(false)
  //lista kierowców
  const fetchDriverIds = async () => {
    try {
      const response = await axios.get("http://localhost:8800/kierowcy");
      const drivers = response.data;
      const driverIds = drivers.map((driver) => driver.id);
      return driverIds;
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  const [driverIds, setDriverIds] = useState([]);  
  useEffect(() => {
    const getDriverIds = async () => {
      const ids = await fetchDriverIds();
      setDriverIds(ids);
    };
  
    getDriverIds();
  }, []);
  //lista pojazdów
  const fetchVehicleIds = async () => {
    try {
      const response = await axios.get("http://localhost:8800/tracki");
      const vehicles = response.data;
      const vehicleIds = vehicles.map((vehicle) => vehicle.id);
      return vehicleIds;
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  const [vehicleIds, setVehicleIds] = useState([]);
  useEffect(() => {
    const getVehicleIds = async () => {
      const ids = await fetchVehicleIds();
      setVehicleIds(ids);
    };
    getVehicleIds();
  }, []);
  

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/tracks", trasa);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  const { currentUser,logout } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
      <TopMenu />
    <div className="form">
      <h1>Dodawanie tras</h1>
      <input
        type="text"
        placeholder="start"
        name="start"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cel"
        name="cel"
        onChange={handleChange}
      />
      <input
        type="time"
        placeholder="godzina startu"
        name="godz_startu"
        onChange={handleChange}
      />
      <input
        type="time"
        placeholder="godzina końca"
        name="godz_konca"
        onChange={handleChange}
      />

      <select type="text" name="pojazdy_id" onChange={handleChange}>
        {vehicleIds.map((id) => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>

      <select type="text" name="pracownicy_id" onChange={handleChange}>
        {driverIds.map((id) => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
      
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
	    </select>

      <button onClick={handleClick}>Dodaj</button>
      {error && "Something went wrong!"}
      <button><Link to="/">Strona główna</Link></button>
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

export default Add;