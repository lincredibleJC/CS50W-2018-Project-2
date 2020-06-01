document.addEventListener('DOMContentLoaded', () => {

  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure buttons
  socket.on('connect', () => {
    
    socket.emit("join");

    document.querySelector('#send-button').addEventListener("click", () => {
      let message = document.getElementById("message").value;
      var date = new Date();
      var localeTimeString = date.toLocaleTimeString();
      socket.emit("send message", message,  localeTimeString);
    });

    document.querySelector("#leave-button").addEventListener("click", () => {
      socket.emit("leave")
    });

  });

  // When a new message is announced, add to message list
  socket.on('announce message', data => {
      const li = document.createElement('li');
      li.innerHTML = `${data.username},  ${data.message}, ${data.timestamp}`;
      document.querySelector('#message_list').append(li);
  });

  // When a new message is announced, add to message list
  socket.on('announce join', data => {
      const li = document.createElement('li');
      li.innerHTML = `${data.username} has entered the room.`;
      document.querySelector('#message_list').append(li);
  });

  // When a new message is announced, add to message list
  socket.on('announce leave', data => {
      const li = document.createElement('li');
      li.innerHTML = `${data.username} has left the room.`;
      document.querySelector('#message_list').append(li);
  });

});

