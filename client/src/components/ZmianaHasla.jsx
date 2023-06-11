import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const ZmianaHasla = () => {
  const [user, setUser] = useState({
    shaslo: "",
    nhaslo: "",
    nhaslo2: "",
  });
  const [err,setError] = useState(false)

  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;

  console.log(currentUser?.id)

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        await axios.get("http://localhost:8800/haslo/"+ userId, user);
        try {
            await axios.put("http://localhost:8800/haslo/"+ userId, user);
            navigate("/Profil");
          } catch (err) {
            console.log(err);
            setError(true)
          }
      } catch (err) {
        console.log(err);
        setError(true)
      }
  };
  if (!currentUser) {
    navigate("/");
    return null;
  }

  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>    
      <TopMenu />
        <div className="form">
      <h1>Edytowanie Profilu</h1>
      <input
        type="password"
        placeholder="Stare hasło"
        name="shaslo"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Nowe hasło"
        name="nhaslo"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Powtórz hasło"
        name="nhaslo2"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Edytuj</button>
      {err && "Something went wrong!"}
      <button><Link to="/Profil">Profil</Link></button>
    </div>
    </center>
    </div>
  );
}else{
  return (
    <div className="main">
      <center>
      <NormalMenu />
    <div className="form">
      <h1>Zmiana hasła</h1>
      <input
        type="text"
        placeholder="Stare hasło"
        name="shaslo"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Nowe hasło"
        name="nhaslo"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Powtórz hasło"
        name="nhaslo2"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Zmień</button>
      {err && "Hasła się nie zgadzają!"}
      <button><Link to="/Profil">Profil</Link></button>
    </div>
        </center>
    </div>
  );
}
};

export default ZmianaHasla;
