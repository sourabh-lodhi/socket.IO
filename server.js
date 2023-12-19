const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
// require("./config/dbConnection");
const { createDatabase, createTable } = require("./config/createTableAndDB");
const { userData } = require("./db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = userData.find((data) => email === data.email);

  if (email === user.email && password === user.password) {
    const friends = userData.filter((data) => email !== data.email);
    return res.render("profile.ejs", { friends, loginUserEmail: user.email });
  }
  res.render("login.ejs");
});

app.post("/chatting", (req, res) => {
  const { email, name, loginEmail } = req.body;
  io.on("connection", (socket) => {
    socket.on(`${email}`, (data) => {
      socket.broadcast.emit(`${loginEmail}`, data);
    });
  });
  res.render("index.ejs", { email, name });
});

// io.on("connection", (socket) => {
//   console.log("user is connected:", socket.id);
// });

server.listen(8000, async () => {
  // await createDatabase("socketIO")
  // await createTable("user")
  console.log("server is running in 8000");
});
