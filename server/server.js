const express = require("express");
const cors = require("cors");
const db_conn = require("./v1/utils/db_conn");
const app = express();
const userRoute = require("./v1/routes/userRoute");
const driverRoute = require("./v1/routes/driverRoute");
const multer = require("multer");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});
const inviteRoute = require("./v1/routes/inviteRoute");

require("dotenv").config();

//static file locations
app.use("/uploads", express.static("uploads"));
db_conn(process.env.MONGODB_URI);

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/driver", driverRoute);
app.use("/api/v1/invite",inviteRoute);
//Socket io connection
io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("chat message", function (data) {
    console.log("data", data);
    io.emit("show element", data);
  });
  socket.on("setUsername", function (data) {
    console.log(data);

    if (users.indexOf(data) > -1) {
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );
    } else {
      users.push(data);
      socket.emit("userSet", { username: data });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to ride share api");
});
//routes
server.listen(5000, () => {
  console.log("app is connected");
});
