import styled from "styled-components";
import notfound from "./assets/2099077-200.png";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Wrapper>
        <NotFoundTitle>404 - Page Not Found</NotFoundTitle>
        <NotFoundMessage>
          The page you are looking for does not exist.
        </NotFoundMessage>
        <Image src={notfound} alt="" />
      </Wrapper>
    </NotFoundContainer>
  );
};

export default NotFound;
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Image = styled.img`
  width: 50px;
  @media (width<500px) {
    width: 35px;
  }
`;
const NotFoundTitle = styled.h2`
  font-size: 34px;
  color: #333;
  margin-bottom: 16px;
  @media (width < 500px) {
    font-size: 24px;
  }
`;

const NotFoundMessage = styled.p`
  font-size: 20px;
  color: #666;
  @media (width < 500px) {
    font-size: 17px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 5px;
  padding: 5rem;
  box-shadow: 0 0 40px 1px lightgray;
`;
