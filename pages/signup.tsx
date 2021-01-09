import { FunctionComponent, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { FormGroup } from "../styled";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { useRegisterMutation } from "../generated/graphql";

interface Input {
  username: string;
  password: string;
}

const Signup: FunctionComponent<{}> = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login] = useRegisterMutation({
    errorPolicy: "all",
  });
  const { register, handleSubmit, errors } = useForm<Input>();

  const onSubmit = async ({ username, password }: Input) => {
    const { errors } = await login({
      variables: {
        registerInput: {
          name: "sddsd",
          username,
          password,
        },
      },
    });

    if (errors) {
      setErrorMessage(errors[0].message);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <h1>Signup with your account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <input
              type="text"
              name="username"
              placeholder="Username"
              ref={register({ required: true, minLength: 3 })}
            />
            {errors.username && errors.username.type === "required" && (
              <ErrorMessage error="Username is required." />
            )}
            {errors.username && errors.username.type === "minLength" && (
              <ErrorMessage error="Username is should be at least 3 characters." />
            )}
          </FormGroup>
          <FormGroup>
            <input
              type="password"
              name="password"
              placeholder="Password"
              ref={register({ required: true, minLength: 3 })}
            />
            {errors.password && errors.password.type === "required" && (
              <ErrorMessage error="Password is required." />
            )}
            {errors.password && errors.password.type === "minLength" && (
              <ErrorMessage error="Password is should be at least 3 characters." />
            )}
          </FormGroup>
          <p>
            you have account?{" "}
            <Link href="/signin">
              <a>
                <span style={{ color: "var(--primary)" }}>login</span>
              </a>
            </Link>
          </p>
          <ErrorMessage
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              margin: "1rem 0",
            }}
            error={errorMessage}
          />
          <Button variant="primary" text="Register" />
        </form>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  margin: 10rem 16rem;

  h1 {
    text-align: center;
  }

  @media (max-width: 600px) {
    margin: 10rem 0;
  }
`;

export default Signup;
