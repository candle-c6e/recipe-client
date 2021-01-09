import { FunctionComponent, CSSProperties } from "react";
import styled from "styled-components";

interface Props {
  style?: CSSProperties;
  error: string;
}

const ErrorMessage: FunctionComponent<Props> = ({ style, error }) => {
  return (
    <Wrapper style={style}>
      <p>{error}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 0.9rem;
  margin: 0.5rem 0;
  color: var(--pastel-red);
`;

export default ErrorMessage;
