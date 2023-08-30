const express = require("express");

const app = express();
const jsonParser = express.json();

app.post("/api/books", jsonParser, (req, res) => {
    console.log(req.body, req.body.title);

    res.end();
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});