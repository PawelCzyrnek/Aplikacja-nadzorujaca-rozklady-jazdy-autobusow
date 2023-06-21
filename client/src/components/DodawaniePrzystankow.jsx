import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Add = () => {
  const [przystanek, setUser] = useState({
    nazwa: "",
    miasto_id: "",
    kordy_x: "",
    kordy_y: ""
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/stops", przystanek);
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
          const response = await axios.get("http://localhost:8800/miasta");
          setDrivers(response.data);
        } catch (err) {
          console.log(err);
          setError(true);
        }
      };
      fetchDrivers();
    }, []);

  const { currentUser } = useContext(AuthContext);
  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>
      <TopMenu />
    <div className="form">
      <h1>Dodawanie przystanków</h1>
      <input
        type="text"
        placeholder="Nazwa przystanku"
        name="nazwa"
        onChange={handleChange}
      />
      <select type="number" name="miasto_id" onChange={handleChange}>
        {drivers.map((miasto) => (
          <option key={miasto.id} value={miasto.id}>{miasto.id}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="kordy_x"
        name="kordy_x"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="kordy_y"
        name="kordy_y"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Dodaj</button>
      {error && "Something went wrong!"}
      <button><Link to="/">Strona główna</Link></button>
      <h2>LEGENDA MIAST</h2>
          {drivers.map((miasto) => (
          <div key={miasto.id}>
            <p>{miasto.id} - {miasto.nazwa_miasta}</p>
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

export default Add;
