import React from 'react';
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.css';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  

  let ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const {name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {

    })

    return () => {
      socket.emit('disconnet');

      socket.off();
    }
  },[ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on('nessage', (message) => {
      setMessages([...messages, message]);
      console.log(message);
    })
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

console.log(message, messages)

  return (
    <div className='outerContainer'>
      <div className='container'>
        <input value={message} onChange={(e => setMessage(e.target.value))} onKeyUp={e => e.key === 'Enter' ? sendMessage(e) : null}/>
      </div>
    </div>
  )
};

export default Chat;