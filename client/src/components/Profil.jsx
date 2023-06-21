import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Profil = () => {
  const { currentUser } = useContext(AuthContext);
  const rolaID = currentUser?.rola_id;
  const navigate = useNavigate();
  const [error,setError] = useState(false)
  const [rola_profil, setRola] = useState([]);
  useEffect(() => {
    const fetchRola = async () => {
      try {
        const response = await axios.get("http://localhost:8800/rola_profil/"+rolaID);
        setRola(response.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchRola();
  }, []);
  if (!currentUser) {
    navigate("/");
    return null;
  }

  if (currentUser?.rola_id === 1) {
    return (
      <div className="main">
        <center>
          <TopMenu />
          <div className="form">
            <h1>Profil</h1>
            <h2>{currentUser?.name} {currentUser?.surename}</h2>
            {rola_profil.map((rola) => (
          <div key={rola.nazwa}><h2>Rola: {rola.nazwa}</h2></div>))}
            <button><Link to="/">Strona główna</Link></button>
            <button><Link to="/EdytowanieProfilu">Edytuj profil</Link></button>
            <button><Link to="/ZmianaHasla">Zmień hasło</Link></button>
            <button><Link to="/ZakupioneBilety">Zakupione bilety</Link></button>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div className="main">
        <center>
          <NormalMenu />
          <div className="form">
            <h1>Profil</h1>
            <h2>{currentUser?.name} {currentUser?.surename}</h2>
            {rola_profil.map((rola) => (
          <div key={rola.nazwa}><h2>Rola: {rola.nazwa}</h2></div>))}
            <button><Link to="/">Strona główna</Link></button>
            <button><Link to="/EdytowanieProfilu">Edytuj profil</Link></button>
            <button><Link to="/ZmianaHasla">Zmień hasło</Link></button>
            <button><Link to="/ZakupioneBilety">Zakupione bilety</Link></button>
          </div>
        </center>
      </div>
    );
  }
};

export default Profil;
