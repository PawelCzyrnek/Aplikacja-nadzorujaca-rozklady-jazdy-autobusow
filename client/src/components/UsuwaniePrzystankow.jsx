import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import home from "./../image/BamBus.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Stops = () => {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchAllStops = async () => {
      try {
        const res = await axios.get("http://localhost:8800/stops");
        setStops(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStops();
  }, []);

  console.log(stops);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/stops/"+id);
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
      <h1>Przystanki</h1>
  {stops.map((przystanek, index) => (
    <div key={index} className="stop">
      <h2>Nazwa przystanku: {przystanek.nazwa}</h2>
      <h2>Miasto: {przystanek.nazwa_miasta}</h2>
      <button className="delete" onClick={() => handleDelete(przystanek.id)}>Usuń</button>
      <button className="update">
        <Link
          to={`/EdytowaniePrzystankow/${przystanek.id}`}
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

export default Stops;