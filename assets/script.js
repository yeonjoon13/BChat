
document.addEventListener("DOMContentLoaded", (_event) => {
  const socket = io();
  document.chatForm = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");
  const username = document.getElementById("uname").innerText;

  socket.on("message", (msg) => {
    const message = document.createElement("li");
    message.innerHTML = `<strong>${msg.username}</strong>: ${msg.text}`;
    if (msg.username === "BlooChatApp") {
      message.style.color = '#00FF00';
      if ((msg.text).includes("has left the chat")) {
        message.style.color = 'red';
      }
    }
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  });

  socket.emit("welcomeMessage", {
    user: username,
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("chatMessage", {
      user: username,
      message: messageToSend.value,
    });
    messageToSend.value = "";    
  });






  


  
});
