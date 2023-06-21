import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Update = () => {
  const [user, setUser] = useState({
    name: "",
    surename: "",
    login: "",
    password: "",
    rola_id: ""
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const userId = location.pathname.split("/")[2]

  console.log(location.pathname.split("/")[2])

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/users/"+ userId, user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  const { currentUser,logout } = useContext(AuthContext);
  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>    
      <TopMenu />
    <div className="form">
      <h1>Edytowanie pracowników</h1>
      <input
        type="text"
        placeholder="Imie"
        name="name"
        onChange={handleChange}
      />
      <input
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

      <input
        type="text"
        placeholder="Rola pracownika"
        name="rola_id"
        onChange={handleChange}
      />  

      <button onClick={handleClick}>Edytuj</button>
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

export default Update;
