import React, { useEffect, useState, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import styled from "styled-components";

const Chat = ({ socket, username, generatedId }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [messageList, setMessageList] = useState([]);

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

  const uploadInputRef = useRef(null);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
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
      </div>
      <div className="chat-footer">
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
      </div>
    </div>
  );
};

export default Chat;
const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
