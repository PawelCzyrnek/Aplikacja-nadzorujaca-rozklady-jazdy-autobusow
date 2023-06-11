import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NormalMenu from "../menu/Normalmenu";
import TopMenu from "../menu/Topmenu";

const Stop = () => {
  const [stop, setStop] = useState({
    nazwa: "",
    miasto_id: "",
    kordy_x: "",
    kordy_y: "",

  });
  const [error,setError] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const stopId = location.pathname.split("/")[2]

  console.log(location.pathname.split("/")[2])

  const handleChange = (e) => {
    setStop((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/stops/"+ stopId, stop);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  const { currentUser,logout } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>    
      <TopMenu/>
    <div className="form">
      <h1>Edytowanie przystankow</h1>
      <input
        type="text"
        placeholder="nazwa przystanku"
        name="nazwa"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="id_miasta"
        name="miasto_id"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="kordy_x"
        name="kordy_x"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="kordy_y"
        name="kordy_y"
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

export default Stop;