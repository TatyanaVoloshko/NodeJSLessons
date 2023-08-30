const path = require("node:path");

const morgan = require('morgan');
const express = require('express');

const routes = require("./routes");
const { error } = require("node:console");

const app = express();

app.use(morgan("combined"));

app.use("/api", routes);

app.get("/", (__, res) => {
    res.send("Hello World!");
});

app.use((__, res, ___) => {
    // res.status(404).send({ message: `Route ${req.url} not found!` });

    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use((error, __, res, ___) => {
    console.error(error);

    res.status(500).send({ message: "Internal Server Error" });
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});