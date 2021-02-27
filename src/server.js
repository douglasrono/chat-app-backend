const hostname = "localhost";
const port = 8000;
import server from "./routes/index";
const servers = server.listen(port);
const io = require("socket.io")(servers);
import verifyToken from "./helpers/verify.token";
import UserHelper from './helpers/user.helper';

const users = [];
const User = {}
io.on("connection", (socket) => {
  socket.on("new-user", async (data) => {
    User[socket.id] = data.name;
    const user = await verifyToken.verifyAllTokens(data.token);
    users.push({
      socketId:socket.id,
      id:user.id,
      email:user.email,
      name:data.name
    })
    socket.broadcast.emit("user-connected", data.name);
  });
  socket.on("send-chat-message",async (messageData) => {
    const message =  messageData.message;
    const user = await verifyToken.verifyAllTokens(messageData.token);
    const sender = users.filter(data => data.email === user.email);
    const receiver = users.filter(data => data.email !== user.email);
    const messageDatas={
      receiverName : receiver[0]===undefined?'Anyonmous': receiver[0].name,
      senderId :sender[0].id,
      message
      
    }
    const insert = await UserHelper.insertData(messageDatas)
    socket.broadcast.emit("chat-message", {
      message: message,
      name: User[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

module.exports = servers;
