import { BrowserRouter, Routes, Route } from "react-router-dom";
import StronaGlowna from "./components/StronaGlowna";
import Login from "./components/Login";
import Register from "./components/Register";
import DodawaniePracownikow from "./components/DodawaniePracownikow";
import DodawaniePojazdow from "./components/DodawaniePojazdow";
import UsuwaniePracownikow from "./components/UsuwaniePracownikow";
import DodawaniePrzystankow from "./components/DodawaniePrzystankow";
import UsuwaniePojazdow from "./components/UsuwaniePojazdow";
import EdytowaniePracownikow from "./components/EdytowaniePracownikow";
import UsuwaniePrzystankow from "./components/UsuwaniePrzystankow";
import EdytowaniePrzystankow from "./components/EdytowaniePrzystankow";
import DodawanieTras from "./components/DodawanieTras";
import EdytowanieTras from "./components/EdytowanieTras";
import UsuwanieTras from "./components/UsuwanieTras";
import Profil from "./components/Profil";
import EdytowanieProfilu from "./components/EdytowanieProfilu";
import ZmianaHasla from "./components/ZmianaHasla";
import EdytowaniePojazdow from "./components/EdytowaniePojazdow";
import Trasa from "./components/Trasa";
import ZakupioneBilety from "./components/ProfilBilety";
import WyszukiwarkaTras from "./components/WyszukiwarkaTras";
import WyswietlaniePrzystankow from "./components/WyswietlaniePrzystankow";
import DodawanieLinii from "./components/DodawanieLinii";
import Linie from "./components/Linie";
import TrasyLinii from "./components/TrasyLinii";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StronaGlowna />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rejestracja" element={<Register />} />
          <Route path="/DodawaniePracownikow" element={<DodawaniePracownikow />} />
          <Route path="/Dodawaniepojazdow" element={<DodawaniePojazdow/>} />
          <Route path="/UsuwaniePracownikow" element={<UsuwaniePracownikow/>} />
          <Route path="/DodawaniePrzystankow" element={<DodawaniePrzystankow/>} />
          <Route path="/UsuwaniePojazdow" element={<UsuwaniePojazdow/>} />
          <Route path="/EdytowaniePracownikow/:id" element={<EdytowaniePracownikow/>} />
          <Route path="/UsuwaniePrzystankow" element={<UsuwaniePrzystankow/>} />
          <Route path="/EdytowaniePrzystankow/:id" element={<EdytowaniePrzystankow/>} />
          <Route path="/DodawanieTras" element={<DodawanieTras/>} />
          <Route path="/EdytowanieTras/:id" element={<EdytowanieTras/>} />
          <Route path="/UsuwanieTras" element={<UsuwanieTras/>} />
          <Route path="/Profil" element={<Profil/>} />
          <Route path="/EdytowanieProfilu" element={<EdytowanieProfilu/>} />
          <Route path="/ZmianaHasla" element={<ZmianaHasla/>} />
          <Route path="/ZakupioneBilety" element={<ZakupioneBilety/>} />
          <Route path="/EdytowaniePojazdow/:id" element={<EdytowaniePojazdow/>} />
          <Route path="/Trasa/:id" element={<Trasa/>} />
          <Route path="/WyszukiwanieTras" element={<WyszukiwarkaTras/>} />
          <Route path="/WyswietlaniePrzystankow/:id" element={<WyswietlaniePrzystankow/>} />
          <Route path="/DodawanieLinii" element={<DodawanieLinii />} />
          <Route path="/Linie" element={<Linie />} />
          <Route path="/TrasyLinii/:id" element={<TrasyLinii/>} />


        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
