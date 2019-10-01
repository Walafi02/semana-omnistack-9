const express = require("express");
const routes = express.Router();

routes.post("/users", (req, res) => {
    // const { idade } = req.query;
    // const { id } = req.params;
    const { nome, email } = req.body;
    return res.json({ nome, email });
});

module.exports = routes;
