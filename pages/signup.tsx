import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { FormGroup } from "../styled";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { MeDocument, useRegisterMutation } from "../generated/graphql";

interface Input {
  name: string;
  username: string;
  password: string;
}

const Signup: FunctionComponent<{}> = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registerMutation] = useRegisterMutation({
    errorPolicy: "all",
  });
  const { register, handleSubmit, errors } = useForm<Input>();

  const onSubmit = async ({ name, username, password }: Input) => {
    const { errors } = await registerMutation({
      variables: {
        registerInput: {
          name,
          username,
          password,
        },
      },
      update: (cache, { data }) => {
        return cache.writeQuery({
          query: MeDocument,
          data: {
            me: data.register,
          },
        });
      },
    });

    if (errors) {
      setErrorMessage(errors[0].message);
    }

    router.push("/");
  };

  return (
    <Layout>
      <Wrapper>
        <h1>Signup with your account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <input
              type="text"
              name="name"
              placeholder="Name"
              ref={register({ required: true, minLength: 3 })}
            />
            {errors.name && errors.name.type === "required" && (
              <ErrorMessage error="Name is required." />
            )}
            {errors.name && errors.name.type === "minLength" && (
              <ErrorMessage error="Name is should be at least 3 characters." />
            )}
          </FormGroup>
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
