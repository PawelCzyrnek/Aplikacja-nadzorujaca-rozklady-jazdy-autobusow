import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Vehicle = () => {
  const [vehicle, setVehicle] = useState({
   id_no:"",
   sits_no:"",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const vehicleId = location.pathname.split("/")[2]

  console.log(location.pathname.split("/")[2])

  const handleChange = (e) => {
    setVehicle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/vehicles/"+ vehicleId, vehicle);
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
      <h1>Edytowanie pojazdow</h1>
      <input
        type="text"
        placeholder="numer rejestracyjny"
        name="id_no"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="ilosc miejsc"
        name="sits_no"
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

export default Vehicle;
