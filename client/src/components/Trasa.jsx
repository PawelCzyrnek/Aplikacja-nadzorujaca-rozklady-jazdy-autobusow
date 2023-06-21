import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import NormalMenu from "../menu/Normalmenu";
import TopMenu from "../menu/Topmenu";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import markerIcon from 'leaflet/dist/images/marker-icon.png';

const Trasa = () => {
  const [tracks, setTracks] = useState([]);

  const navigate = useNavigate()
  const location = useLocation()
  const trackId = location.pathname.split("/")[2]
  //console.log(trackId)

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tracks/"+trackId);
        setTracks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTracks();
  }, []);

  //Przystanki
  const [stops, setStops] = useState([]);
  useEffect(() => {
    const fetchAllStops = async () => {
      try {
        const res = await axios.get("http://localhost:8800/stops/"+trackId);
        setStops(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStops();
  }, []);

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;

  const [error,setError] = useState(false)

  useEffect(() => {
    const map = L.map('map').setView([49.7060778, 20.4213056], 9, 5);

    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 16,
    }).addTo(map);

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon,
      iconUrl: markerIcon,
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
    });

    stops.forEach((przystanek) => {
      const marker = L.marker([przystanek.kordy_x, przystanek.kordy_y])
        .bindPopup(przystanek.nazwa)
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [stops]);

  const [bilet_m, setbilet_m] = useState([]);
  useEffect(() => {
    const fetchAllbilet_m = async () => {
      try {
        const res = await axios.get("http://localhost:8800/bilet_m/"+trackId);
        setbilet_m(res.data[0].id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllbilet_m();
  }, []);
  console.log(bilet_m)

  const handleClick = async (v,e) => {
    if (v === 1) {
    e.preventDefault();
    try {
      //console.log(e)
      await axios.post("http://localhost:8800/tickets/"+trackId+'/'+userId);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }} else if (v === 2) {
      e.preventDefault();
      try {
        //console.log(e)
        await axios.post("http://localhost:8800/ticketsm/"+bilet_m+'/'+userId);
        navigate("/");
      } catch (err) {
        console.log(err);
        setError(true)
      }}
  };

  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>    
      <TopMenu />
          <div className="formusun">
          <h1>Informacje o wybranej trasie</h1>
          {tracks.map((track) => (
          <div key={track.id} className="track">
            <h2>Start: {track.start}</h2>
            <h2>Cel: {track.cel}</h2>
            <h2>Godzina startu: {track.godz_startu}</h2>
            <h2>Godzina końca: {track.godz_konca}</h2>
            <h2>Pojazd: {track.id_no}</h2>
            <h2>Kierowca: {track.name+" "+track.surename}</h2>
            <h2>Dni kursowania: {track.dni_kursowania}</h2>
            <table className="przystanekTrasy">
            <tr><td>Nazwa przystanku:</td>
              <td>Miasto:</td>
              <td>Czas dotarcia:</td></tr></table>
            {stops.map((przystanek) => (
            <div key={przystanek.id} className="stop"><table className="przystanekTrasy">
              <tr><td>{przystanek.nazwa}</td>
              <td>{przystanek.nazwa_miasta}</td>
              <td>{przystanek.czas}</td></tr>
            </table></div>
            ))}
           
           <button onClick={(e) => handleClick(1, e)}>Kup bilet</button>
           <button onClick={(e) => handleClick(2, e)}>Kup bilet miesięczny</button>
            {error && "Something went wrong!"}
          </div>
          ))}
           <div id="map" style={{ width: '800px', height: '600px' }}></div>
           <div>
        <h2>LEGENDA</h2>
        <p>F – kursuje od poniedziałku do piątku</p>
        <p>6 – kursuje w sobotę</p>
        <p>7 – kursuje w niedziele</p>
        <p>S – kursuje w dniach nauki szkolnej</p>
      </div>
        </div>
      </center>
    </div>
  );  
}else{
    return (
      <div className="main">
        <center>
        <NormalMenu />
        <div className="formusun">
          <h1>Informacje o wybranej trasie</h1>
          {tracks.map((track) => (
          <div key={track.id} className="track">
            <h2>Start: {track.start}</h2>
            <h2>Cel: {track.cel}</h2>
            <h2>Godzina startu: {track.godz_startu}</h2>
            <h2>Godzina końca: {track.godz_konca}</h2>
            <h2>Pojazd: {track.id_no}</h2>
            <h2>Kierowca: {track.name+" "+track.surename}</h2>
            <h2>Dni kursowania: {track.dni_kursowania}</h2>
            <table className="przystanekTrasy">
            <tr><td>Nazwa przystanku:</td>
              <td>Miasto:</td>
              <td>Czas dotarcia:</td></tr></table>
            {stops.map((przystanek) => (
            <div key={przystanek.id} className="stop"><table className="przystanekTrasy">
              <tr><td>{przystanek.nazwa}</td>
              <td>{przystanek.nazwa_miasta}</td>
              <td>{przystanek.czas}</td></tr>
            </table></div>
            ))}
           
           <button onClick={(e) => handleClick(1, e)}>Kup bilet</button>
           <button onClick={(e) => handleClick(2, e)}>Kup bilet miesięczny</button>
            {error && "Something went wrong!"}
          </div>
          ))}
           <div id="map" style={{ width: '800px', height: '600px' }}></div>
           <div>
        <h2>LEGENDA</h2>
        <p>F – kursuje od poniedziałku do piątku</p>
        <p>6 – kursuje w sobotę</p>
        <p>7 – kursuje w niedziele</p>
        <p>S – kursuje w dniach nauki szkolnej</p>
      </div>
        </div>
      </center>
      </div>
    );
  }
};

export default Trasa;