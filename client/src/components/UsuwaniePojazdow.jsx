import React, { useContext , useEffect } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:8800/vehicles");
        setVehicles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllVehicles();
  }, []);

  console.log(vehicles);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/vehicles/"+id);
      window.location.reload()
    } catch(err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
      <TopMenu />
          <div className="formusun">
          <h1>Pojazdy</h1>
        {vehicles.map((pojazd) => (
          <div key={pojazd.id} className="vehicle">
            <h2>rejestracja: {pojazd.id_no}</h2>
            <h2>miejsca: {pojazd.sits_no}</h2>
            <button className="delete" onClick={() => handleDelete(pojazd.id)}>Usuń</button>
            <button className="update">
            <Link
                to={`/EdytowaniePojazdow/${pojazd.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Edytuj
              </Link>
            </button>
          </div>
        ))}
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

export default Vehicles;