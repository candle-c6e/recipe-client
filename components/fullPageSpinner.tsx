import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const FullPageSpinner = () => {
  return (
    <Wrapper>
      <FaSpinner size={60} />
    </Wrapper>
  );
};

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: ${spinner} 1s linear infinite;
  }
`;

export default FullPageSpinner;
