import React from "react";
import lobio from "../assets/lobio.png";
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const [showexplanation, setShowExplanation] = useState(false);

  return (
    <NavContainer>
      <Logo src={lobio} alt="logo" />
      <Overview
        onMouseEnter={() => setShowExplanation(true)}
        onMouseLeave={() => setShowExplanation(false)}
      >
        <FontAwesomeIcon
          icon={faLightbulb}
          style={{ width: "40px", height: "40px", color: "goldenrod" }}
        />
        <ExplanationDiv showexplanation={showexplanation ? true : undefined}>
          <p>
            ✨Lobio is a user-friendly chat app that requires generating a
            unique Room ID to chat privately with friends. It enables real-time
            text messaging and easy picture sharing, ensuring seamless
            communication.{" "}
          </p>
        </ExplanationDiv>
      </Overview>
    </NavContainer>
  );
};

export default Navigation;

const Logo = styled.img`
  width: 6rem;
`;

const Overview = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #43a047;
`;

const ExplanationDiv = styled.div`
  opacity: ${(props) => (props.showexplanation ? 1 : 0)};
  visibility: ${(props) => (props.showexplanation ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  position: absolute;
  top: 0;
  right: 7rem;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  width: 350px;
  @media (width<500px) {
    right: 1rem;
  }
`;

const NavContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 1rem;
  @media (width<500px){
    width: 95%;
  }
`;
