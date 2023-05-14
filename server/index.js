import express from "express";
import mysql from "mysql";
import cors from "cors";
import authRoutes from "./routes/authh.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST, GET, DELETE"],
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

/*app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM users WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Usunieto uzytkownika!");
  });
});*/

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

app.listen(8800, () => {
  console.log("Connected to backend.");
});


