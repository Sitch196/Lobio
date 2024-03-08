import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  max-width: 80%;
  max-height: 80%;
  overflow: hidden;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    max-width: 90%;
    max-height: 90%;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Modal = ({ image, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContent>
        <ModalImage src={image} alt="Clicked" />
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
