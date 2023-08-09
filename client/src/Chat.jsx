import React, { useEffect, useState, useRef, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./assets/lobio.png";
import {
  faPaperPlane,
  faUpload,
  faHome,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/GeneralContext";

const Chat = ({ socket }) => {
  const { username, generatedId } = useContext(AuthContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();
  //////////////////////////////
  const sendMessage = () => {
    if (currentMessage.trim() !== "" || selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Base64-encoded image
        const messageData = {
          generatedId: generatedId,
          author: username,
          message: currentMessage.trim(),
          image: base64Image,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        };
        console.log(messageData);
        socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
        setSelectedImage(null);
      };

      if (selectedImage) {
        reader.readAsDataURL(selectedImage); // Convert selected image to base64
      } else {
        reader.onloadend(); // If no image, send message without image
      }
    }
  };
  const deleteConversation = () => {
    setMessageList([]);
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    // Automatically send the image when it is selected
    if (selectedImage) {
      sendMessage();
    }
  }, [selectedImage]);

  const goHome = () => {
    navigate("/");
  };
  const uploadInputRef = useRef(null);

  return (
    <ChatWindow className="chat-window">
      <ChatHeader className="chat-header">
        <Logo src={logo} alt="logo" width="60px" />
        <IconWithLabel onClick={goHome}>
          <FontAwesomeIcon
            icon={faHome}
            color="white"
            style={{ cursor: "pointer" }}
          />
          <Label>Home</Label>
        </IconWithLabel>
        {!showDeleteIcon && (
          <IconWithLabel onClick={deleteConversation}>



            <FontAwesomeIcon
              icon={faTrashAlt}
              color="white"
              style={{ cursor: "pointer" }}
            />
            <Label>Delete Conversation</Label>
          </IconWithLabel>
        )}
      </ChatHeader>
      <ChatBody className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((msg, id) => {
            return (
              <MessageWrapper
                className="message"
                id={username === msg.author ? "you" : "other"}
                key={id}
              >
                {msg.message && (
                  <Message className="message-content">
                    <p>{msg.message}</p>
                  </Message>
                )}
                {msg.image && (
                  <SentImageContainer>
                    <SentImage src={msg.image} alt="Sent" />
                  </SentImageContainer>
                )}
                <div className="message-meta">
                  <p>{msg.author}</p>
                  <p>{msg.time}</p>
                </div>
              </MessageWrapper>
            );
          })}
        </ScrollToBottom>
      </ChatBody>
      <ChatFooter className="chat-footer">
        <Upload
          onClick={() => {
            // Trigger the file input when clicking on the Upload component
            uploadInputRef.current.click();
          }}
        >
          <FontAwesomeIcon icon={faUpload} color="white" />
          <UploadInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedImage(file);
            }}
            ref={uploadInputRef}
          />
        </Upload>
        <MessageInput
          placeholder="Type here ..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <SendButton onClick={sendMessage}>
          <div className="btn_container">
            <FontAwesomeIcon icon={faPaperPlane} />
            <p>Send</p>
          </div>
        </SendButton>
      </ChatFooter>
    </ChatWindow>
  );
};
export default Chat;
const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;

`
const ChatFooter = styled.div`
    border: 1px solid #263238;
  border-top: none;
  display: flex;
  height: 7rem;
  @media (width<500px){
    height: 4.5rem;
  }

`
const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChatHeader = styled.div`
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #263238;
  position: relative;
  padding: 0 2rem;
  p {
    display: block;
    padding: 0 1em 0 2em;
    color: #fff;
    font-weight: 700;
    line-height: 45px;
  }
`;
const Message = styled.div`
  width: auto;
  height: auto;
  min-height: 50px;
  max-width: 450px;
  background-color: #43a047;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 5px;
  margin-left: 5px;
  padding: 0.8rem;
  overflow-wrap: break-word;
  word-break: break-word;
  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const SentImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SentImage = styled.img`
  width: 250px;
  border-radius: 10px;
`;

const Upload = styled.div`
  width: 20%;
  display: grid;
  place-items: center;
  background-color: rgba(67, 160, 71, 0.8);
  cursor: pointer;
  &:hover {
    background-color: #43a047;
  }
`;

const UploadInput = styled.input`
  /* Hide the default file input appearance */
  display: none;
  /* Optional: Add some styling to make the upload button look more appealing */
  color: #fff;
  border: none;
  width: 10rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &::file-selector-button {
    display: none;
  }
`;

const MessageInput = styled.textarea`
  width: 100%;
  resize: none;
  padding: 10px;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  & .btn_container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & p {
    margin-left: 5px;
  }
  
`;
const IconWithLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    transform: translateY(-2px);
  }
`;
const Logo = styled.img`
  mix-blend-mode: exclusion;
`;
const Label = styled.label`
  color: white;
  cursor: pointer;
  @media (width <600px) {
    display: none;
  }
`;
