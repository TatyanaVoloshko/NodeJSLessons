const express = require('express');


const app = express();


app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.get("/movies", (req, res) => {
    res.send("Movies");
});

app.post("/movies", (req, res) => {
    res.send("Create movie");
});

app.get("/movies/:id", (req, res) => {
    const { id } = req.params;

    res.send(`Movie ${id}`);
});

app.put("/movies/:id", (req, res) => {
    const { id } = req.params;

    res.send(`Update movie ${id}`);
});

app.delete("/movies/:id", (req, res) => {
    const { id } = req.params;

    res.send(`Delete movie ${id}`);
});

app.get("/movies/:movieId/reviews/:reviewsId", (req, res) => {
    const { movieId, reviewsId } = req.params;

    res.send(`Review ${reviewsId} for movie ${movieId}`);
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});