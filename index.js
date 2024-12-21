import express from "express";
import axios from "axios";
import morgan from "morgan";

const app = express();
const port = 3003;
const API_URL = "https://secrets-api.appbrewery.com";

//Middlewares
app.use(morgan('dev'));

const yourUsername = "adrianjadev";
const yourPassword = "adminpass";
const yourAPIKey = "2969e57b-0855-4fd3-9693-8ddf7825f222";
const yourBearerToken = "72728880-f4dc-44a1-ae05-ba2ede11ef9d";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/random`);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {

  try {
    const result = await axios.get(`${API_URL}/all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message)
  }
});

app.get("/apiKey", async (req, res) => {

  try {
    const result = await axios.get(`${API_URL}/filter`, {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      }
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {

  try {
    const result = await axios.get(`${API_URL}/secrets/42`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
