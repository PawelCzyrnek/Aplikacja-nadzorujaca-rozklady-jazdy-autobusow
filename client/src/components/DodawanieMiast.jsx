import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Add = () => {
  const [miasto, setMiasto] = useState({
    nazwa_miasta: "",
    
  });
  const [errorCity, setErrorCity] = useState(false);

  const navigate = useNavigate();

  const handleCityChange = (e) => {
    setMiasto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddCity = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/miasto", miasto);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorCity(true);
    }
  };

  const { currentUser, logout } = useContext(AuthContext);
  if (currentUser?.rola_id === 1) {
    return (
      <div className="main">
        <center>
          <TopMenu />
          <div className="form">
            <h1>Dodawanie miast</h1>
            <input
              type="text"
              placeholder="Nazwa miasta"
              name="nazwa_miasta"
              onChange={handleCityChange}
            />
           
            <button onClick={handleAddCity}>Dodaj miasto</button>
            {errorCity && "Coś poszło nie tak przy dodawaniu miasta!"}
            <button>
              <Link to="/">Strona główna</Link>
            </button>
          </div>
        </center>
      </div>
    );
  } else {
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
