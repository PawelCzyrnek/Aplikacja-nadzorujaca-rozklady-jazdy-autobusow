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
  console.log(trackId)

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tracks/"+trackId);
        setTracks(res.data);
        console.log(res.data)
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
  const userId = currentUser.id;

  const [error,setError] = useState(false)

  const [track, setTrackss] = useState({
    id: "",
    user_id: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(e)
      await axios.post("http://localhost:8800/tickets/"+trackId+'/'+userId);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  useEffect(() => {
    const planes = [
      ['Limanowa', 49.7060778, 20.4213056],
      ['Tymbark', 49.731789, 20.320364],
      ['Nowy Sącz', 49.6071921, 20.699753],
      ['Stary Sącz', 49.5656942, 20.6376901],
      ['Tarnów', 50.006402, 20.9707158],
      ['Kraków', 50.0661558, 19.9459694]
    ];

    const start1 = (planes[0][1] + planes[planes.length - 1][1]) / 2;
    const start2 = (planes[0][2] + planes[planes.length - 1][2]) / 2;

    const map = L.map('map').setView([start1, start2], 9, 5);

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

    for (let i = 0; i < planes.length; i++) {
      const marker = L.marker([planes[i][1], planes[i][2]])
        .bindPopup(planes[i][0])
        .addTo(map);
    }

    return () => {
      map.remove();
    };
  }, []);


  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>    
      <TopMenu />
          <div className="formusun">
          {tracks.map((track) => (
          <div key={track.id} className="track">
            <h2>Start: {track.start}</h2>
            <h2>Cel: {track.cel}</h2>
            <h2>Godzina startu: {track.godz_startu}</h2>
            <h2>Godzina końca: {track.godz_konca}</h2>
            <h2>id pojazdu: {track.pojazdy_id}</h2>
            <h2>id pracownika: {track.pracownicy_id}</h2>
            <h2>Dni kursowania: {track.dni_kursowania}</h2>
            {stops.map((przystanek) => (
            <div className="przystanekTrasy"><div key={przystanek.id} className="stop">
              <h2>Nazwa przystanku: {przystanek.nazwa}</h2>
              <h2>Miasto: {przystanek.nazwa_miasta}</h2>
              <h2>Czas dotarcia: {przystanek.czas}</h2>
            </div></div>
            ))}
           
            <button onClick={handleClick}>Kup bilet
            </button>
            <button onClick={handleClick}>Kup bilet miesięczny
            </button>
            {error && "Something went wrong!"}
          </div>
          ))}
           <div id="map" style={{ width: '800px', height: '600px' }}></div>
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

export default Trasa;