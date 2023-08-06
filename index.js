require("dotenv").config();
// process.env.

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI);
const userRoutes = require("./routes/user");

app.get("/", (req, res) => {
  try {
    res.status(200).json("Bienvenue sur l'API de Marvel");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.use(userRoutes);

app.get("/comics", async (req, res) => {
  let query = "";
  const { limit, skip, title } = req.query;

  if (limit) query += `limit=${limit}&`;

  if (skip) query += `skip=${skip}&`;

  if (title) query += `title=${title}&`;

  // console.log(
  //   req.query,
  //   `https://lereacteur-marvel-api.herokuapp.com/comics?${query}apiKey=${process.env.API_KEY}`
  // );

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${query}apiKey=${process.env.API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {}
});

app.get("/comic/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.id}?apiKey=${process.env.API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {}
});

app.post("/comics", async (req, res) => {
  const comicsList = [];
  const { comics } = req.body;
  //console.log(characters);
  if (comics)
    for await (const comic of comics) {
      try {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comic/${comic}?apiKey=${process.env.API_KEY}`
        );
        comicsList.push(response.data);
      } catch (error) {}
    }

  //console.log(comicsList);
  res.status(200).json(comicsList);
});

app.get("/characters", async (req, res) => {
  let query = "";
  const { limit, skip, name } = req.query;

  if (limit) query += `limit=${limit}&`;

  if (skip) query += `skip=${skip}&`;

  if (name) query += `name=${name}&`;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${query}apiKey=${process.env.API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {}
});

app.get("/character/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.id}?apiKey=${process.env.API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {}
});

app.post("/characters", async (req, res) => {
  const charactersList = [];
  const { characters } = req.body;
  //console.log(characters);
  if (characters)
    for await (const character of characters) {
      try {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/character/${character}?apiKey=${process.env.API_KEY}`
        );
        charactersList.push(response.data);
      } catch (error) {}
    }

  //console.log(charactersList);
  res.status(200).json(charactersList);
});

app.all("*", (req, res) => {
  try {
    return res.status(404).json("Page not found!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server started 🔥 to port " + process.env.PORT);
});
