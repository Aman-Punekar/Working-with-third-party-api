const express = require('express');
const app = express();

const todoRoutes = require("./routes/todo");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("", todoRoutes);

app.listen(3000, () => {
    console.log('Server is listening is to port 3000');
})