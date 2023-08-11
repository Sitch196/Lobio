import React from "react";
import styled from "styled-components";
const Copy = () => {
  return (
    <Container>
      <Copied>Copied to Clipboard</Copied>
    </Container>
  );
};

export default Copy;
const Container = styled.div``;
const Copied = styled.div`
  border: 2px solid #43a047;
  color: #43a047;
  padding: 0.55rem;
  border-radius: 5px;
  background-color: rgba(67, 160, 71, 0.15);
`;
