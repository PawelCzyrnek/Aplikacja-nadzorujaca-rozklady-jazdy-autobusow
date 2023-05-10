import { BrowserRouter, Routes, Route } from "react-router-dom";
import StronaGlowna from "./components/StronaGlowna";
import Login from "./components/Login";
import Register from "./components/Register";
import DodawaniePracownikow from "./components/DodawaniePracownikow";
import DodawaniePojazdow from "./components/DodawaniePojazdow";
import UsuwaniePracownikow from "./components/UsuwaniePracownikow";
import DodawaniePrzystankow from "./components/DodawaniePrzystankow";
//import Update from "./pages/Update";

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

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
