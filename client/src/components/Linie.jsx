import React, { useContext , useEffect } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Linie = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:8800/linie");
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
      await axios.delete("http://localhost:8800/linie/"+id);
      window.location.reload()
    } catch(err) {
      console.log(err);
    }
  };

  const { currentUser,logout } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
      <TopMenu />
          <div className="formusun">
        {vehicles.map((pojazd) => (
          <div key={pojazd.id} className="vehicle">
            <h2>nazwa: {pojazd.nazwa}</h2>
            <h2>nr: {pojazd.nr}</h2>
            
            <button className="update">
            <Link
                to={`/TrasyLinii/${pojazd.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Informacje o linii
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

export default Linie;