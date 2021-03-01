"use strict";

var socket = io('http://localhost:8000'); // const io = require('socket.io')(8000)

var messageContainer = document.getElementById('message-container');
var messageForm = document.getElementById('send-container');
var messageInput = document.getElementById('message-input');
var name = prompt('What is your name?');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjZAZ21haWwuY29tIn0sImlhdCI6MTYxNDQ0NzYzN30.buGjaqXvqQEMdmZloBJcGqQTkzyg1c4ovEzHpMKU6Uw';
var userData = {
  name: name,
  token: token
};
appendMessage('You joined');
socket.emit('new-user', userData);
socket.on('chat-message', function (data) {
  appendMessage("".concat(data.name, ": ").concat(data.message));
});
socket.on('user-connected', function (name) {
  appendMessage("".concat(name, " connected"));
});
socket.on('user-disconnected', function (name) {
  appendMessage("".concat(name, " disconnected"));
});
messageForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var message = messageInput.value;
  appendMessage("You: ".concat(message));
  var messageData = {
    message: message,
    token: token
  };
  socket.emit('send-chat-message', messageData);
  messageInput.value = '';
});

function appendMessage(message) {
  var messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
//# sourceMappingURL=chatController.js.map