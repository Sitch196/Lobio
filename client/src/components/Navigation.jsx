import React from "react";
import lobio from "../assets/lobio.png";
import styled from "styled-components";
const Navigation = () => {
  return (
    <NavContainer>
      <Logo src={lobio} alt="logo" />
      <nav>
        <Ul>
          <li>Home</li>
          <li>About</li>
          <li>FAQ</li>
        </Ul>
      </nav>
    </NavContainer>
  );
};

export default Navigation;
const Logo = styled.img`
  width: 6rem;
`;
const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 1rem;
`;
const Ul = styled.ul`
  display: flex;
  gap: 1.5rem;

  & li {
    list-style-type: none;
    font-size: 1.3rem;
  }
`;
