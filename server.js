const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

if (!fs.existsSync("projects.json")) {
  fs.writeFileSync("projects.json", JSON.stringify([]));
}

app.use(express.json());
app.use(express.static("public"));

app.post("/api/add", (req, res) => {
  const { name, url } = req.body;
  const data = JSON.parse(fs.readFileSync("projects.json"));
  data.push({ name, url });
  fs.writeFileSync("projects.json", JSON.stringify(data));
  res.json({ success: true });
});

app.get("/api/list", (req, res) => {
  const data = JSON.parse(fs.readFileSync("projects.json"));
  res.json(data);
});

app.listen(PORT, () => console.log("Running: " + PORT));