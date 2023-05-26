import { db } from "../index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE login = ?";
  
  db.query(q, [req.body.login], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("Brak użytkownika o podanych danych!");

    //Check password 
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Niepoprawny login lub hasło!");
    
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    res.cookie("access_token", token, { maxAge: 900000, httpOnly: true }).json(other)
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("Wylogowano!")
}
