import { CSSProperties, FunctionComponent } from "react";
import styled, { css } from "styled-components";

type Variant = "primary" | "success";

interface Props {
  text: string;
  type?: "submit" | "button";
  onClick?: () => void;
  style?: CSSProperties;
  variant?: Variant;
}

const Button: FunctionComponent<Props> = ({
  text,
  type = "submit",
  onClick,
  style,
  variant,
}) => {
  return (
    <ButtonStyle style={style} variant={variant} type={type} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Pick<Props, "variant">>`
  cursor: pointer;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 1rem;
  color: #fff;
  transition: all 0.2s linear;
  ${(props) => props.variant === "primary" && PrimaryButton}
  ${(props) => props.variant === "success" && SuccessButton}
`;

const PrimaryButton = css`
  background-color: var(--primary);
`;

const SuccessButton = css`
  background-color: var(--green);
  &:hover {
    background-color: var(--light-green);
  }
`;

export default Button;
