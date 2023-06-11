import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Update = () => {
  const [linie, setLinie] = useState({
    nazwa: "",
    nr: "",
    
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const linieId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchLinie = async () => {
      try {
        const response = await axios.get("http://localhost:8800/linie", + linieId);
        setLinie(response.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    fetchLinie();
  }, [linieId]);

  const handleChange = (e) => {
    setLinie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/linie/" + linieId, linie);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
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
            placeholder="nazwa"
            name="nazwa"
            value={linie.nazwa}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="nr"
            name="nr"
            value={linie.nr}
            onChange={handleChange}
          />

          <button onClick={handleClick}>Edytuj</button>
          {error && <p>Something went wrong!</p>}
          <button>
            <Link to="/">Strona główna</Link>
          </button>
        </div>
      </center>
    </div>
  );
};

export default Update;
