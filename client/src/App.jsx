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

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;