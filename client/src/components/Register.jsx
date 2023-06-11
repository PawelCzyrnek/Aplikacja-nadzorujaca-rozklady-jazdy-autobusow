import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Add = () => {
  const [user, setUser] = useState({
    name: "",
    surename: "",
    login: "",
    password: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/users", user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  const { currentUser } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
      <TopMenu />
   <div className="form">
      <h1>Rejestracja</h1>
      <input
        type="text"
        placeholder="Imię"
        name="name"
        onChange={handleChange}
      />
      <input
        rows={5}
        type="text"
        placeholder="Nazwisko"
        name="surename"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Nazwa użytkownika"
        name="login"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Hasło"
        name="password"
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
   <div className="form">
      <h1>Rejestracja</h1>
      <input
        type="text"
        placeholder="Imię"
        name="name"
        onChange={handleChange}
      />
      <input
        rows={5}
        type="text"
        placeholder="Nazwisko"
        name="surename"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Nazwa użytkownika"
        name="login"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Hasło"
        name="password"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Dodaj</button>
      {error && "Something went wrong!"}
      <button><Link to="/">Strona główna</Link></button>
    </div>
    </center>
    </div>
  );
  }
};

export default Add;