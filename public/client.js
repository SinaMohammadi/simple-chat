const socket = io('ws://localhost:3000');
document.getElementById('join-room-button').addEventListener('click', () => {
  const roomInput = document.getElementById('room-input');
  const roomName = roomInput.value.trim();
  if (roomName) {
    socket.emit('join room', roomName);
    roomInput.value = '';
    document.getElementById('messages').innerHTML = ''; 
  }
});
socket.on('message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  document.getElementById('messages').appendChild(item);
});
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  document.getElementById('messages').appendChild(item);
});
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('input');
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
