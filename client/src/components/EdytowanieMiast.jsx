import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Update = () => {
  const [miasto, setMiasto] = useState({
    nazwa_miasta: "",
   
  });
  const [errorCity, setErrorCity] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const cityId = location.pathname.split("/")[2];

  console.log(location.pathname.split("/")[2]);

  const handleCityChange = (e) => {
    setMiasto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateCity = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/miasto/" + cityId, miasto);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorCity(true);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>
        <TopMenu />
        <div className="form">
          <h1>Edytowanie miast</h1>
          <input
            type="text"
            placeholder="Nazwa miasta"
            name="nazwa_miasta"
            onChange={handleCityChange}
          />
          <button onClick={handleUpdateCity}>Edytuj miasto</button>
          {errorCity && "Coś poszło nie tak przy edytowaniu miasta!"}
          <button>
            <Link to="/">Strona główna</Link>
          </button>
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
