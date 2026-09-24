"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "./ui/Button/Button";
import Input from "./ui/Input/Input";
import Typography from "./ui/Typography/Typography";
import { useAuth } from "./AuthProvider";

const Page = styled.div`
  width: min(100% - 2.5rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.75rem 0 4.5rem;

  @media (max-width: 640px) {
    width: min(100% - 1.25rem, ${({ theme }) => theme.layout.maxWidth});
    padding: 2.5rem 0 3rem;
  }
`;

const Intro = styled.section`
  max-width: 680px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Text = styled(Typography)`
  font-size: 1.08rem;
`;

const Form = styled.form`
  display: grid;
  max-width: 520px;
  gap: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 520px) {
    padding: ${({ theme }) => theme.spacing.lg};

    & > button {
      width: 100%;
    }
  }
`;

const ErrorText = styled(Typography)`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const HelpText = styled(Typography)`
  color: ${({ theme }) => theme.colors.softText};
`;

export default function LoginForm() {
  const router = useRouter();
  const { isHydrated, login, session } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isHydrated && session) {
      router.push("/");
    }
  }, [isHydrated, router, session]);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(values);
      router.push("/");
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Page>
      <Intro>
        <Title variant="h1">Login</Title>
        <Text>
          Sign in to the demo customer account to view protected store pages.
        </Text>
      </Intro>

      <Form onSubmit={handleSubmit} noValidate>
        {error ? (
          <ErrorText role="alert" variant="body">
            {error}
          </ErrorText>
        ) : null}

        <Input
          autoComplete="email"
          disabled={isLoading}
          label="Email"
          name="email"
          onChange={handleChange}
          required
          type="email"
          value={values.email}
        />
        <Input
          autoComplete="current-password"
          disabled={isLoading}
          label="Password"
          name="password"
          onChange={handleChange}
          required
          type="password"
          value={values.password}
        />

        <HelpText variant="bodySmall">
          Demo email: demo@nextstore.test. Password: any 8+ characters.
        </HelpText>

        <Button disabled={isLoading} size="large" type="submit">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </Form>
    </Page>
  );
}
