"use client";

import { useState } from "react";
import styled from "styled-components";
import Button from "./ui/Button/Button";
import Input from "./ui/Input/Input";
import Textarea from "./ui/Textarea/Textarea";
import Typography from "./ui/Typography/Typography";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.75rem 0 4.5rem;

  @media (max-width: 640px) {
    padding: 2.5rem 0 3rem;
  }
`;

const Intro = styled.section`
  max-width: 720px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Text = styled(Typography)`
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: grid;
  max-width: 680px;
  gap: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.78);
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 520px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const SuccessText = styled(Typography)`
  color: ${({ theme }) => theme.colors.success};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const SubmitButton = styled(Button)`
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function validate(values) {
  const nextErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    nextErrors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    nextErrors.message = "Message is required.";
  }

  return nextErrors;
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSuccess("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    console.log("Contact form submitted:", form);
    setSuccess("Thanks for your message. We will get back to you soon.");
    setForm(initialForm);
  }

  return (
    <Page>
      <Intro>
        <Title variant="h1">Contact Us</Title>
        <Text>
          Send a message about a product, the sample store, or anything you
          would like to improve in this beginner project.
        </Text>
      </Intro>

      <Form onSubmit={handleSubmit} noValidate>
        {success ? (
          <SuccessText role="status" variant="body">
            {success}
          </SuccessText>
        ) : null}

        <Input
          error={errors.name}
          label="Name"
          name="name"
          onChange={handleChange}
          required
          value={form.name}
        />

        <Input
          error={errors.email}
          label="Email"
          name="email"
          onChange={handleChange}
          required
          type="email"
          value={form.email}
        />

        <Textarea
          error={errors.message}
          label="Message"
          name="message"
          onChange={handleChange}
          required
          value={form.message}
        />

        <SubmitButton size="large" type="submit">
          Send Message
        </SubmitButton>
      </Form>
    </Page>
  );
}
