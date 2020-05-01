const io = require("socket.io")();

let connectedUsers = {};
io.on("connection", socket => {
  socket.on("login", obj => {
    const { type, username } = obj;
    socket.username = username;
    if (type === "doctor") socket.join("doctors");
    connectedUsers[username] = socket;

    console.log(`${username} has now connected to the io server!`);
  });

  socket.on("newAppointment", obj => {
    const { to, data } = obj;
    connectedUsers[to].emit("newAppointment", {data});
  });

  socket.on("appointmentApproved", obj => {
    const { to, data } = obj;
    connectedUsers[to].emit("appointmentApproved", data);
  });

  socket.on("notification", obj => {
    io.to("doctors").emit("notification", obj);
  });
});

io.listen(8000);
