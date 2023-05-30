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
  const q = "SELECT * FROM przystanki p INNER JOIN miasto m ON m.id = p.miasto_id";
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

app.post("/stops", (req, res) => {
  const q = "INSERT INTO przystanki(`nazwa`, `miasto_id`) VALUES (?)";

  const values = [
    req.body.nazwa,
    req.body.miasto_id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

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
  const q = "SELECT * FROM trasy";
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
    const q = "UPDATE trasy SET 'start' = ?, 'cel'= ?, WHERE id = ? ";
    const values=[
      req.body.start,
      req.body.cel,

    ]

  db.query(q, [...values,trackId], (err, data) => {
    if (err) return res.send(err);
    return res.json("User has been updated successfully.");
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

    //Check password 
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

app.listen(8800, () => {
  console.log("Connected to backend.");
});


