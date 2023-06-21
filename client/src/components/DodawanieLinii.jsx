import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Add = () => {
  const [linia, setLinia] = useState({
    nazwa: "",
    nr: "",
    
    
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLinia((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/linie", linia);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const { currentUser, logout } = useContext(AuthContext);
  if (currentUser?.rola_id === 1) {
    return (
      <div className="main">
        <center>
          <TopMenu />
          <div className="form">
            <h1>Dodawanie linii</h1>
            <input
              type="number"
              placeholder="numer"
              name="nr"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="nazwa"
              name="nazwa"
              onChange={handleChange}
            />
            
            <button onClick={handleClick}>Dodaj</button>
            {error && <p>Something went wrong!</p>}
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
