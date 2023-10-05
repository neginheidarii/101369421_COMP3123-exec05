const express = require("express");
const app = express();
const router = express.Router();
const userJson = require("./user.json");

// http://localhost:8087/home

router.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

// http://localhost:8087/profile

router.get("/profile", (req, res) => {
  res.json(userJson);
});

// http://localhost:8087/login

router.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (userJson.username === username && userJson.password === password) {
    res.json({
      status: true,
      message: "User Is valid",
    });
  } else if (userJson.username !== username) {
    res.json({
      status: false,
      message: "User Name is invalid",
    });
  } else {
    res.json({
      status: false,
      message: "Password is invalid",
    });
  }
});

// http://localhost:8087/logout

router.get("/logout/:username", (req, res) => {
  const { username } = req.params;
  res.send(`<h1>${username} successfully logout</h1>`);
});


app.use("/", router);

const PORT = process.env.PORT || 8087; // Define the PORT variable

// Use the PORT variable to listen to the server
const server = app.listen(PORT, () => {
  console.log("Web Server is listening at port " + PORT);
});