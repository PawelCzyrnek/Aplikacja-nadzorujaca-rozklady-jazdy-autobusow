import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const EdytowanieProfilu = () => {
  const [user, setUser] = useState({
    name: "",
    surename: "",
    login: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;

  console.log(currentUser?.id)

  if (!currentUser) {
    navigate("/");
    return null;
  }
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/profil/"+ userId, user);
      navigate("/Profil");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
      <TopMenu />
    <div className="form">
      <h1>Edytowanie Profilu</h1>
      <input
        type="text"
        placeholder={currentUser?.name}
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder={currentUser?.surename}
        name="surename"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder={currentUser?.login}
        name="login"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Edytuj</button>
      {error && "Something went wrong!"}
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
      <h1>Edytowanie Profilu</h1>
      <input
        type="text"
        placeholder={currentUser?.name}
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder={currentUser?.surename}
        name="surename"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder={currentUser?.login}
        name="login"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Edytuj</button>
      {error && "Something went wrong!"}
      <button><Link to="/Profil">Profil</Link></button>
    </div>
        </center>
    </div>
  );
}
};

export default EdytowanieProfilu;
