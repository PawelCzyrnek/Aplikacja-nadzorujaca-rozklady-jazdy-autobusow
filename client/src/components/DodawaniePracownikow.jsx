import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Add = () => {
  const [pracownik, setUser] = useState({
    name: "",
    surename: "",
    login: "",
    password: "",
    rola_id: ""
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/Employees", pracownik);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>
      <TopMenu />
    <div className="form">
      <h1>Dodawanie pracowników</h1>
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

      <Link>Rola:</Link>
      <select type="text" name="rola_id" onChange={handleChange}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
	    </select>

      <button onClick={handleClick}>Dodaj</button>
      {error && "Something went wrong!"}
      <button><Link to="/">Strona główna</Link></button>
      <h2>LEGENDA RÓL</h2>
            <p>1 - admin</p>
            <p>2 - user</p>
            <p>3 - kierowca</p>
            <p>4 - analityk</p>
            <p>5 - planista</p>
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
