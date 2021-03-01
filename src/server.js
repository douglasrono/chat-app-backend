const hostname = "localhost";
const port = 8000;
import server from "./routes/index";
import verifyToken from "./helpers/verify.token";
import UserHelper from './helpers/user.helper';
const servers = server.listen(port);
const io = require("socket.io")(servers);

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
    const broadData={
      name:data.name,
      email:user.email
    }
    socket.broadcast.emit("user-connected", broadData);
  });
  socket.on("send-chat-message",async (messageData) => {
    const message =  messageData.message;
    const user = await verifyToken.verifyAllTokens(messageData.token);
    const sender = users.filter(data => data.email === user.email);
    const receiver = users.filter(data => data.email !== user.email);
    const messageDatas={
      receiverName : receiver[0]===undefined?'Anyonmous': receiver[0].name,
      senderId :sender[0].id,
      receiverId:receiver[0]===undefined?0: receiver[0].id,
      message
      
    }
    const insert = await UserHelper.insertData(messageDatas)
    // const messages = await UserHelper.getMessages()
    socket.broadcast.emit("chat-message", {  
      
      message: message,
      name: User[socket.id],
      receiverName: receiver[0]===undefined?'Anyonmous': receiver[0].name
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", User[socket.id]);
    delete User[socket.id];
  });
});

module.exports = servers;
