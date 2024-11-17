require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { scrapeRates } = require("./scraper");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3000;
const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

dbClient.connect();

app.use(bodyParser.json());
app.use(require("cors")());

// Endpoint pour récupérer les taux
app.get("/api/rates", async (req, res) => {
  const riamoneyRates = await scrapeRates("https://www.riamoneytransfer.com/fr-fr/");
  const chapchapRates = await scrapeRates("https://transfertchapchap.com/");
  res.json({ riamoneyRates, chapchapRates });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
