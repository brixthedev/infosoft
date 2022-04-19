const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "bulletinboarddb",
});

app.use(cors());
app.use(express.json());

app.get("/", (_, response) => {
  db.query("SELECT * FROM articles", (error, result) => {
    if (error) response.send(error);
    response.send(result);
  });
});

app.post("/", (request, response) => {
  const { title, content, createdat } = request.body;

  db.query(
    `
        insert into articles (title, content, createdat)
        values (?, ?, ?)
        `,
    [title, content, createdat],
    (error) => {
      if (error) response.send(error);
      response.send("Values inserted successfully to the database");
    }
  );
});

app.delete("/", (request, response) => {
  const { title } = request.body;
  db.query(
    `
        delete from articles where title = (?)
    `,
    [title],
    (error) => {
      if (error) response.send(error);
      response.send("Values deleted successfully from the database");
    }
  );
});

app.listen(3001, () => console.log("Server started successfully on port 3001"));
