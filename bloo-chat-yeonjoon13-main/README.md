[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7698614&assignment_repo_type=AssignmentRepo)
# Homework 5: Bloo Chat!

A simple realtime messaging application build with Node, Express, and Socket.io.

After cloning the application, run `npm install` to install the dependencies. 

To run the application, use the command `npm run dev`.

Detailed instructions are at this [url](https://cs280spring.github.io/hw/hw5/index.html).

The application is deployed on [Heroku](https://bloo-chat-starter.herokuapp.com/).



Bloo Chat implements the use of express, node, mongoose, and most importantly socket. Socket helps the client and the server comununicate with each other. Other implementations such as fetching and ajax can help communicate between the server and the client, but we would be continuously calling back and forth for a really long time by hand if we were to do this; instead, websocket can help us connect to the server and stay connected, so we wouldn't need to continuously keep calling a fetch request. This can help deal with a lot of request to the server which in our case we would need a lot of requests because of all the messages. If we were to continuously fetch our messages, the extra time to make up the request and closing it down will eventually add up creating a lot slower and bigger application. In my application, I created a socket in the index.js which will act as the server. Then I created the client side in script.js which will communicate with index.js. In script.js, it gets the username and password from the page and sends it over to the server with the call "socket.emit". The server then gets the information and creates the formatted messages and sends it back to the client which creates the html to implement into the index.njk. That is essentially how socket is used between script.js and index.js to communicate and send the messages. In addition, it helps display the messages whenver a user connects, disconnects, and show all the users that are online with the use of socket by communicating which user got online or disconnected. 

In addition, we have CRUD operations in our UserDao.js that helps us implement operations for our users. In the CRUD operations, we have API error messages that get sent whenever an error occurs. We also got routes that have post and get requests which helps us get all the stuff in the database. For example, the get request /api/users helps us get all the users in the database. Meanwhile the post request for /register helps us upload a user into the database. We use MongoDB in our application to create our database and has collections that represent a single entity in our app, in our case it would be the users. In addition to the users, we have passwords hashed and salted for the users in the database, so if an attacker were to get into the database, they wouldn't be able to get access to all the user's infos. Finally, tokens are used to help keep the chatroom only available to the correct user. So the chatroom is only accessed after it goes through the adminAuth function which checks the token of the user. Therefore, only users with the correct password and username are allowed to be in the chatroom with their username. 