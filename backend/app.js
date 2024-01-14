const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}
));


app.use(cookieparser());
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));
app.use('/temporary', express.static("/temporary"));
const user = require("./routes/userRouter.js");
const notes = require("./routes/notesRouter.js");
app.use("/api/getnotes", user);
app.use("/api/getnotes", notes);
module.exports = app;
