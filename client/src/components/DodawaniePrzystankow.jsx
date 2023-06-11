import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
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

  const { currentUser,logout } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
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
      <input
        type="number"
        placeholder="Numer id miasta"
        name="miasto_id"
        onChange={handleChange}
      />
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
