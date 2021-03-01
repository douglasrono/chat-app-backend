
const socket = io('http://localhost:8000')
// const io = require('socket.io')(8000)
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
 
const name = prompt('What is your name?') 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjZAZ21haWwuY29tIn0sImlhdCI6MTYxNDQ0NzYzN30.buGjaqXvqQEMdmZloBJcGqQTkzyg1c4ovEzHpMKU6Uw';
const userData = {
  name,
  token
}


appendMessage('You joined')
socket.emit('new-user', userData) 

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})
 
socket.on('user-connected', name => {
  appendMessage(`${name} connected`) 
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})
 
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  const messageData = {
    message,
    token
  }
  socket.emit('send-chat-message', messageData)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}