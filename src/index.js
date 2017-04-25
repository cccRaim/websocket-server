import io from 'socket.io-client';

const socket = io('ws://localhost:8080');

socket.on('news', function (data) {
  console.log(data);
});