import express from "express";
import mysql from "mysql";
import cors from "cors";
import authRoutes from "./routes/authh.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(express.json());
app.use("/", authRoutes);
app.use(cookieParser());

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "haslo",
  database: "anrja",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/vehicles", (req, res) => {
  const q = "SELECT * FROM pojazdy";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

//INNER JOIN
app.get("/stops", (req, res) => {
  const q = "SELECT * FROM przystanki p LEFT JOIN miasto m ON m.id = p.miasto_id";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const q = "INSERT INTO users(`name`, `surename`, `login`, `password`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.surename,
    req.body.login,
    req.body.password,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/Employees", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const q = "INSERT INTO users(`name`, `surename`, `login`, `password`, `rola_id`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.surename,
    req.body.login,
    hash,
    req.body.rola_id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/vehicles", (req, res) => {
  const q = "INSERT INTO pojazdy(`id_no`, `sits_no`) VALUES (?)";

  const values = [
    req.body.id_no,
    req.body.sits_no,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM users WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/vehicles/:id", (req, res) => {
  const vehicleId = req.params.id;
  const q = " DELETE FROM pojazdy WHERE id = ? ";

  db.query(q, [vehicleId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/stops/:id", (req, res) => {
  const stopId = req.params.id;
  const q = " DELETE FROM przystanki WHERE id = ? ";

  db.query(q, [stopId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/stops/:id", (req, res) => {
  const stopId = req.params.id;
  const q = "UPDATE przystanki SET nazwa=?,  miasto_id= ?, kordy_x= ?, kordy_y= ? WHERE id = ?";

  const values = [
    req.body.nazwa,
    req.body.miasto_id,
    req.body.kordy_x,
    req.body.kordy_y,
  ];
  db.query(q, [...values,stopId], (err, data) => {
    if (err) return res.send(err);
    
    return res.json(data);
  });
});

app.post("/stops", (req, res) => {
  const q = "INSERT INTO przystanki(`nazwa`, `miasto_id`, `kordy_x`, `kordy_y`) VALUES (?)";

  const values = [
    req.body.nazwa,
    req.body.miasto_id,
    req.body.kordy_x,
    req.body.kordy_y,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//Trasy
app.post("/tracks", (req, res) => {
  const q = "INSERT INTO trasy(start, cel, godz_startu, godz_konca, pojazdy_id, pracownicy_id, dni_kursowania) VALUES (?)";
  const values = [
    req.body.start,
    req.body.cel,
    req.body.godz_startu,
    req.body.godz_konca,
    req.body.pojazdy_id,
    req.body.pracownicy_id,
    req.body.dni_kursowania,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/tracks", (req, res) => {
  const q = "SELECT DISTINCT t.*, p.id_no, u.name, u.surename FROM trasy t LEFT JOIN pojazdy p ON p.id=t.pojazdy_id LEFT JOIN users u ON u.id=t.pracownicy_id";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.delete("/tracks/:id", (req, res) => {
  const trackId = req.params.id;
  const q = " DELETE FROM trasy WHERE id = ? ";

  db.query(q, [trackId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Track has been deleted successfully.");
  });
});


app.put("/tracks/:id", (req, res) => {
  const trackId = req.params.id;
  const q = "UPDATE trasy SET start= ?, cel= ?, godz_startu= ?, godz_konca= ?, pojazdy_id= ?, pracownicy_id= ?, dni_kursowania= ? WHERE id = ?";

  const values = [
    req.body.start,
    req.body.cel,
    req.body.godz_startu,
    req.body.godz_konca,
    req.body.pojazdy_id,
    req.body.pracownicy_id,
    req.body.dni_kursowania,
  ];
  db.query(q, [...values,trackId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const q = "UPDATE users SET name= ?, surename= ?, login= ?, password= ?, rola_id = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.surename,
    req.body.login,
    hash,
    req.body.rola_id,
  ];

  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    if (req.body.name.length === 0) return res.status(404).json("Brak nowego hasła!");
    if (req.body.surename.length === 0) return res.status(404).json("Brak nowego hasła!");
    if (req.body.login.length === 0) return res.status(404).json("Brak nowego hasła!");
    if (req.body.rola_id.length === 0) return res.status(404).json("Brak nowego hasła!");
    if (hash.length === 0) return res.status(404).json("Brak nowego hasła!");
    return res.json(data);
  });
});

app.put("/haslo/:id", (req, res) => {
  const userId = req.params.id;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.nhaslo, salt);
  const q = "UPDATE users SET password= ? WHERE id = ?";

  const values = [
    hash,
  ];

  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    if (req.body.nhaslo.length === 0) return res.status(404).json("Brak nowego hasła!");
    if (req.body.nhaslo != req.body.nhaslo2)
      return res.status(400).json("Niepoprawny powtórzenie hasła!");
    return res.json(data);
  });
});

app.get("/haslo/:id", (req, res) => {
  const q = "SELECT password FROM users WHERE id = ?";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.shaslo,
      data[0].password
    );
    console.log(req.body.nhaslo)

    if (!isPasswordCorrect)
      return res.status(400).json("Niepoprawne hasło!"); console.log(err, 'niepoprawne no')
    return res.json(data);
  });
});

app.put("/profil/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET name= ?, surename= ?, login= ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.surename,
    req.body.login,
  ];

  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
//edytowanie pojazdów
app.put("/vehicles/:id", (req, res) => {
  const vehicleId = req.params.id;
  const q = "UPDATE pojazdy SET id_no= ?, sits_no= ? WHERE id = ?";

  const values = [
    req.body.id_no,
    req.body.sits_no,
  ];
  db.query(q, [...values,vehicleId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
//Bilety
app.post("/tickets/:id/:userId", (req, res) => {
  const q = "INSERT INTO bilet_zakupiony (`bilet_o_id`, `user_id`) VALUES (?)";
  const values = [
    req.params.id,
    req.params.userId,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/tracks/:id", (req, res) => {
  const q = "SELECT DISTINCT t.*, p.id_no, u.name, u.surename FROM trasy t LEFT JOIN pojazdy p ON p.id=t.pojazdy_id LEFT JOIN users u ON u.id=t.pracownicy_id WHERE t.id = ?";
  console.log(req.params.id)
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

//Przystanki trasy
app.get("/stops/:idTrasy", (req, res) => {
  const idTrasy = req.params.idTrasy;
  const q = "SELECT * FROM przystanki p INNER JOIN miasto m ON m.id = p.miasto_id INNER JOIN przystanki_trasy pt ON pt.przystanki_id = p.id WHERE pt.trasy_id = ?";
  db.query(q, [idTrasy], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/trasy/search", (req, res) => {
  const searchText = req.query.text;

  const q = "SELECT DISTINCT t.*, po.id_no, u.name, u.surename FROM trasy t LEFT JOIN przystanki_trasy pt ON t.id=pt.trasy_id LEFT JOIN przystanki p ON p.id=pt.przystanki_id LEFT JOIN miasto m ON m.id=p.miasto_id LEFT JOIN linie_trasy lt ON t.id=lt.trasa_id LEFT JOIN pojazdy po ON po.id=t.pojazdy_id LEFT JOIN users u ON u.id=t.pracownicy_id WHERE t.start LIKE ? OR t.cel LIKE ? OR p.nazwa LIKE ? OR m.nazwa_miasta LIKE ?;";
  const searchValue = `%${searchText}%`;
  console.log(searchText, searchValue)
  db.query(q, [searchValue, searchValue,searchValue,searchValue], (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.json(data);
  });
});

app.get("/bilety/:idUser", (req, res) => {
  const q = "SELECT * FROM bilet_zakupiony WHERE user_id = ?";
  db.query(q, [req.params.idUser], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/biletm/:idUser", (req, res) => {
  const q = "SELECT * FROM bilet_zakupiony_m WHERE users_id = ?";
  db.query(q, [req.params.idUser], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});

app.post("/stops/:id", (req, res) => {
  try {
    const q = "INSERT INTO przystanki_trasy(`przystanki_id`, `trasy_id`, `czas`) VALUES (?)";
  
    const values = [
      req.body.id,
      req.params.id,
      req.body.czas,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) {
        console.error(err);
        return res.send(err);
      }
      return res.json(data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post("/linie", (req, res) => {
  const q = "INSERT INTO linie (nazwa, nr) VALUES (?)";
  const values = [
    req.body.nazwa,
    req.body.nr,
    
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/linie", (req, res) => {
  const q = "SELECT * FROM linie";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/trasy/:id", (req, res) => {
  const q = "SELECT DISTINCT t.*, po.id_no, u.name, u.surename FROM trasy t LEFT JOIN linie_trasy lt ON t.id=lt.trasa_id LEFT JOIN pojazdy po ON po.id=t.pojazdy_id LEFT JOIN users u ON u.id=t.pracownicy_id WHERE linia_id = ?";
  
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/przystanki/:id", (req, res) => {
  const q = "SELECT * FROM przystanki s INNER JOIN linie_stops ls ON s.id=ls.stops_id INNER JOIN miasto m ON m.id=miasto_id WHERE linie_id = ?";
  console.log(req.params.id)
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

//Dodawanie tras do linii
app.post("/tracks/:id", (req, res) => {
  try {
    const q = "INSERT INTO linie_trasy(`linia_id`, `trasa_id`) VALUES (?)";
  
    const values = [
      req.body.id,
      req.params.id,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) {
        console.error(err);
        return res.send(err);
      }
      return res.json(data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/kierowcy", (req, res) => {
  const q = "SELECT * FROM users WHERE rola_id='kierowca'";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/tracki", (req, res) => {
  const q = "SELECT * FROM pojazdy";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/miasta", (req, res) => {
  const q = "SELECT * FROM miasto";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/miasto", (req, res) => {
  const q = "INSERT INTO miasto(`nazwa_miasta`) VALUES (?)";

  const miasto = [
    req.body.nazwa_miasta,
    
  ];

  db.query(q, [miasto], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/miasto/:id", (req, res) => {
  const cityId = req.params.id;
  const q = "UPDATE miasto SET nazwa_miasta= ? WHERE id = ?";

  const values = [
    req.body.nazwa_miasta,
  
  ];
  db.query(q, [...miasto,cityId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/miasto", (req, res) => {
  const q = "SELECT * FROM miasto";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.delete("/miasto/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM miasto WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/linie/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM linie WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/linie/:id", (req, res) => {
  const stopId = req.params.id;
  const q = "UPDATE linie SET nazwa=?,  nr= ? WHERE id = ?";

  const values = [
    req.body.nazwa,
    req.body.nr,
  ];
  db.query(q, [...values,stopId], (err, data) => {
    if (err) return res.send(err);
    
    return res.json(data);
  });
});