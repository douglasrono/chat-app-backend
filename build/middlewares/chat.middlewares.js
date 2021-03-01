"use strict";

var users = [];

var addUser = function addUser(_ref) {
  var id = _ref.id,
      names = _ref.names,
      room = _ref.room;
  names = names.trim().toLowerCase();
  room = room.trim().toLowerCase();
  var existingUser = users.find(function (user) {
    return user.room === room && user.names === names;
  });
  if (!names || !room) return {
    error: 'Username and room are required.'
  };
  if (existingUser) return {
    error: 'Username is taken.'
  };
  var user = {
    id: id,
    names: names,
    room: room
  };
  users.push(user);
  return {
    user: user
  };
};

var removeUser = function removeUser(id) {
  var index = users.findIndex(function (user) {
    return user.id === id;
  });
  if (index !== -1) return users.splice(index, 1)[0];
};

var getUser = function getUser(id) {
  return users.find(function (user) {
    return user.id === id;
  });
};

var getUsersInRoom = function getUsersInRoom(room) {
  return users.filter(function (user) {
    return user.room === room;
  });
};

module.exports = {
  addUser: addUser,
  removeUser: removeUser,
  getUser: getUser,
  getUsersInRoom: getUsersInRoom
};
//# sourceMappingURL=chat.middlewares.js.map