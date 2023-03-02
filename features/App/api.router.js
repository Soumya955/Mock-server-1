const express = require("express");
const PlayerModel = require("./player.model");

const app = express.Router();


app.post("/player", async (req, res) => {
  try {
    let newPlayer = await PlayerModel.create(req.body);
    res.send(newPlayer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/player", async (req, res) => {
  try {
    let players = await PlayerModel.find();
    res.send(players);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/randomword", async (req, res) => {
    let N=Math.floor(Math.random() * 6) + 5;
    let result = '';
    const ch = 'abcdefghijklmnopqrstuvwxyz';
    const chL = ch.length;
    for (let i = 0; i < N; i++) {
      result += ch.charAt(Math.floor(Math.random() * chL));
    }
    res.send(result)
  
});


module.exports = app;
