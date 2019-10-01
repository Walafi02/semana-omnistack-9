const express = require("express");
const mongoose = require("mongoose");
const routes = require("./route");

const app = express();

mongoose.connect(
    "mongodb+srv://walafi:<password>@cluster0-xgwbk.mongodb.net/semana09?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
