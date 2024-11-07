import React, { useState, useRef, useEffect, useContext } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { io } from 'socket.io-client';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import {Context} from './Usernamecontext';


const ChatApp = () => {
  const [usersselected,setUserselected] = useState([]);
  const [socket,setSocket] = useState(null);
  const [userr,setUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState('');
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [disabled,setDisabled] = useState(true);
  const [unread_msg,setUnreadmsg] = useState([]);
  const chatAreaRef = useRef(null);
  const navigate = useNavigate();
  const {Username} = useContext(Context);
  
  useEffect(()=>{
    const temp = async ()=>{
     try{
      //console.log(Username.Username);
      const result = await axios.post("https://server-gsw0.onrender.com/retrieve_messages",{username:Username.Username});
      setMessages(result.data);
      console.log(result.data);
     }catch(error){
      console.log(error);
     }
    }
    temp();
  },[Username]);

  useEffect(()=>{
    const temp = async ()=>{
      const socket = io("https://server-gsw0.onrender.com");
      setSocket(socket);
      socket.emit("username",Username);
      return () => {
        socket.disconnect();
      };
    }
    temp();
  },[Username])

  useEffect(() => {
    if (socket) {
        // Handler function to process received messages
        const handleReceivedMessage = (data) => {
            const message = {
                text: data.message,
                time: new Date().toLocaleTimeString(),
                movement: 'left',
                marginleft: 0,
                timemargin: 0,
                marginright: 63,
                bgcolor: '#c6c7e0',
                rcv: data.sender,
            };
            if(userr!==data.sender.Username)setUnreadmsg(prev=>[...prev,data.sender.Username]);
            setMessages((prevState => ({
              ...prevState,
              [data.sender.Username]: [...(prevState[data.sender.Username] || []), message]
          })));
          const temp = async()=>{
            try{
            const res = await axios.post("https://server-gsw0.onrender.com/store_messages",{
              username:Username.Username,
              other_user:data.sender.Username,
              message:message
            });console.log(res);
            }catch(error){console.log(error);}
          }
          temp();
        };

        // Add event listener
        socket.on("rcv_message", handleReceivedMessage);
        // Cleanup function to remove the listener on unmount
        return () => {
            socket.off("rcv_message", handleReceivedMessage);
        };
    }
}, [socket,userr,unread_msg,messages,Username]); // Only depend on socket


  useEffect(() => {
    const fetchSelectedUsers = async () => {
      try {
        const res = await axios.post("https://server-gsw0.onrender.com/get_selected_users", { username: Username });
        console.log(res.data);
        setUserselected(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchSelectedUsers();
  }, [Username]);

  const searchUsers = async (e) => {
    try {
      const user = e.target.value;
      setSearch(user);
      const response = await axios.post("https://server-gsw0.onrender.com/get_users", {
        searchValue: user,
        username:Username
      });

      if (user) {
        const filtered = response.data.filter(u => u.toLowerCase().includes(user.toLowerCase()));
        if (filtered.length > 0) setFilteredUsers(filtered);
        else setFilteredUsers(["No such users found"]);
      } else {
        setFilteredUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectedusers = async (user)=>{
    setSearch('');
    setFilteredUsers([]);
    setUserselected(prev => [...prev,user]);
    try{
      await axios.post("https://server-gsw0.onrender.com/selected_users",{username:Username,Selected_users:user});
    }catch(error){
      console.log(error);
    }
  }
  const handleclose = async (user)=>{
    const index = usersselected.indexOf(user);
    setUser(null); 
    setDisabled(true);
    usersselected.splice(index,1);
    setUserselected(prev => [...prev]);
    try{
      await axios.post("https://server-gsw0.onrender.com/delete_users",{username:Username,Selected_users:user});
    }catch(error){
      console.log(error);
    }
  }
  const handleClick = () => {
    if(inputMessage.length > 0){
      const data = {
        text: inputMessage,
        time: new Date().toLocaleTimeString(),
        marginLeft: 63,
        movement: 'right',
        timeMargin: 90  ,
        bgcolor: 'green',
        marginRight: 0,
        rcv:userr
      };
      setInputMessage('');
      setMessages((prevState => ({
        ...prevState,
        [userr]: [...(prevState[userr] || []), data]
    })));
    const temp = async()=>{
      try{
        console.log(data);
      const res = await axios.post("https://server-gsw0.onrender.com/store_messages",{
        username:Username.Username,
        other_user:userr,
        message:data
      });
      console.log(res);
      }catch(error){console.log(error);}
    }
    temp();
      socket.emit("messages",{message:inputMessage,reciever:userr,sender:Username});
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Pane */}
      <div style={styles.leftPane}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Users"
            onChange={searchUsers}
            value={search}
            style={styles.searchInput}
          />
          {filteredUsers.length > 0 && (
            <div style={styles.dropdown}>
              {filteredUsers.map((user, index) => (
                <div key={index} style={styles.dropdownItem} onClick={()=>{selectedusers(user)}}>
                  {user}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={styles.chatList}>
          {
            usersselected.map((user,index) => (
              <div style={styles.chatItem}>
                <div onClick = {()=>{setUser(user); setDisabled(false); 
                  const index = unread_msg.indexOf(user);
                  unread_msg.splice(index,1);
                  setUnreadmsg(prev=>[...prev]);
                  }} key = {index} >{user}
                {unread_msg.includes(user) && <Badge color="primary" variant="dot" sx={{marginLeft:"10px"}}/>}
              </div>
              <CloseIcon onClick = {()=>{handleclose(user)}} sx={{ marginTop: "-22px", float:"right"}}/>
              </div>
            ))
          }
          {/* Add more chats as needed */}
        </div>
        <button onClick={() => { navigate('/') }} style={{ marginBottom: "5%" }} className='btn btn-success'>Log Out</button>
      </div>

      {/* Right Pane */}
      <div className='card' style={styles.rightPane}>
        <div className='card-header' style={{ backgroundColor: "#3b3a3a", height: "60px" }}>
          <div style={{ float: "left", paddingTop: "10px" }}>{userr}</div>
        </div>
        <div className='card-body' style={styles.chatBox} ref={chatAreaRef}>
          {
            userr && messages[userr] && messages[userr].map((message, index) => (
              <div key={index} style={{ marginBottom: "40px" }}>
                <div style={{
                  color: `${message.color}`,
                  backgroundColor:`${message.bgcolor}`,
                  float: `${message.movement}`,
                  marginLeft: `${message.marginLeft}%`,
                  marginRight: `${message.marginRight}%`,
                  width: `${message.text.length - message.text.length - 1 < 8 ? message.text.length - message.text.length - 1 * 35.7142857143 : 400}px`,
                 padding: "10px",
                  height: `${ message.text.length === 1?  50: (((message.text.length / 9) - (message.text.length - 1)) * 35)}px`,
                  border: "2px solid white",
                  borderRadius: "30px",
                  textAlign: "left"
                }}>{message.text}</div>
                <div style={{ marginBottom: "20px", marginLeft: `${message.timeMargin}%`, marginRight: `${message.marginRight}%`}} className="text-muted">{message.time}</div>
              </div>
            ))
          }
        </div>
        <TextField sx={{ input: { color: 'white' } }} color="success" focused id="outlined-basic" label="Type here" variant="outlined"
          onChange={(e) => { setInputMessage(e.target.value) }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }}
          value={inputMessage}
          disabled = {disabled}
          InputProps={{
            endAdornment: (
              <Button disabled = {disabled} onClick={handleClick} sx={{ marginTop: "10px", marginBottom: "10px" }} size="small" variant="contained" endIcon={<SendIcon />}>Send</Button>
            )
          }}
        />
      </div>
    </div>
  );
}

// Styling
const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
  },
  leftPane: {
    width: '30%',
    borderRight: '2px solid #24e066',
    display: 'flex',
    borderRadius: '30px',
    flexDirection: 'column',
  },
  rightPane: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: 'black',
    border: '1px solid green'
  },
  searchBar: {
    padding: '10px',
    backgroundColor: '#111',
    borderBottom: '2px solid #24e066',
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '2px',
    backgroundColor: '#000',
    border: '1px solid #24e066',
    color: '#24e066',
    borderRadius: '30px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#111',
    border: '1px solid #24e066',
    borderRadius: '5px',
    zIndex: 1000,
    maxHeight: '150px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column', // Change to column for vertical display
  },
  dropdownItem: {
    padding: '10px',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#24e066',
    },
  },
  chatList: {
    flexGrow: 1,
    overflowY: 'auto',
  },
  chatItem: {
    padding: '15px',
    borderBottom: '1px solid #24e066',
    cursor: 'pointer',
    color: '#fff',
  },
  chatBox: {
    flexGrow: 1,
    overflowY: 'auto',
    backgroundColor: '#111',
    color: '#fff',
  },
};

export default ChatApp;