import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { FormGroup } from "../styled";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { MeDocument, useLoginMutation } from "../generated/graphql";

interface Input {
  username: string;
  password: string;
}

const Signin: FunctionComponent<{}> = (props) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login] = useLoginMutation({
    errorPolicy: "all",
  });
  const { register, handleSubmit, errors } = useForm<Input>();

  const onSubmit = async ({ username, password }: Input) => {
    const { errors } = await login({
      variables: {
        loginInput: {
          username,
          password,
        },
      },
      update: (cache, { data }) => {
        return cache.writeQuery({
          query: MeDocument,
          data: {
            me: data.login,
          },
        });
      },
    });

    if (errors) {
      return setErrorMessage(errors[0].message);
    }

    router.push("/");
  };

  return (
    <Layout>
      <Wrapper>
        <h1>Signin with your account</h1>
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
            you don't have account?{" "}
            <Link href="/signup">
              <a>
                <span style={{ color: "var(--primary)" }}>register</span>
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
          <Button variant="primary" text="Login" />
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

export default Signin;
