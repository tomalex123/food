import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

// create express app
const app = express();
// define port
const PORT = 4200;
// enable CORS for all routes
app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.post("/support", (req, res) => {
  // const {name, phone} = req.body;   
 res.status(200).send({ "message" : "Form data received successfully" });
});

// Метод .listen() запускает HTTP-сервер и заставляет его «слушать» указанный порт
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
