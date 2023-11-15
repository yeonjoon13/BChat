const debug = require("debug")("bloo-chat");
const nunjucks = require("nunjucks");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const db = require("./data/db");
const users = require("./routes/users.js");
const auth = require("./routes/auth.js");
const bodyParser = require('body-parser')
const formatMessage = require('./util/messages');
const onlineUsers = [];
let str = "";
const cookieParser = require("cookie-parser");
const { adminAuth } = require("./routes/middleware.js");
let usersName; 


const port = process.env.PORT || 7500;
db.connect();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("assets"));
app.use(cookieParser());

//routing
app.use(users);
app.use(auth);

app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.get("/chatroom", adminAuth, (req, res) => {
  usersName = (req.user);
  res.render("chatroom.njk");
});

io.on("connection", function (socket) {
  //Welcomes the user
  socket.on("welcomeMessage", (nm) => {
    let sID = socket.id;
    let user = usersName;
    onlineUsers.push({name: user, id: sID});
    if (onlineUsers.length === 1) {
      str = "Unfortunately no one is online at the moment";
    } else {
      str = "Online users: ";
      onlineUsers.forEach(o => {
        if (o.name !== usersName) {
          str += o.name + ",";
        }
      })
    }
    socket.broadcast.emit('message', formatMessage('BlooChatApp',usersName+ ' has joined the chat'));
    socket.emit("message", formatMessage('BlooChatApp', 'Welcome ' + usersName));
    socket.emit("message", formatMessage('BlooChatApp',  str));
  })
  
  //Broadcast when user disconnects
  socket.on('disconnect', () => {
    let dcID = socket.id;
    onlineUsers.forEach(o => {
      if (dcID === o.id) {
        const ind = onlineUsers.findIndex(object => {
          return object.id === dcID;
        });
        onlineUsers.splice(ind, 1);
        io.emit('message', formatMessage('BlooChatApp', o.name + ' has left the chat'));
      }
    })
  })

  socket.on("chatMessage", (msg) => {
    let messageID = socket.id;
    onlineUsers.forEach(o => {
      if (messageID === o.id) {
        const ind = onlineUsers.findIndex(object => {
          return object.id === messageID;
        });
        let dataUser = onlineUsers[ind];
        //Broadcast the message to everyone
        io.emit("message", formatMessage(dataUser.name, msg.message));
      }
    })
  });


});


http.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});


