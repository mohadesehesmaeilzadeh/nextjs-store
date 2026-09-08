"use client";

import { useState } from "react";
import styled from "styled-components";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Intro = styled.section`
  max-width: 720px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: 3rem;
  line-height: 1.1;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: grid;
  max-width: 680px;
  gap: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 520px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 800;
`;

const Input = styled.input`
  width: 100%;
  min-height: 48px;
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  background: #ffffff;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  resize: vertical;
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  background: #ffffff;
`;

const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.92rem;
  font-weight: 700;
`;

const SuccessText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 800;
`;

const SubmitButton = styled.button`
  min-height: 48px;
  width: fit-content;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  padding: 0.75rem 1rem;
  font-weight: 800;
  transition: background 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

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
        <Title>Contact Us</Title>
        <Text>
          Send a message about a product, the sample store, or anything you
          would like to improve in this beginner project.
        </Text>
      </Intro>

      <Form onSubmit={handleSubmit} noValidate>
        {success ? <SuccessText role="status">{success}</SuccessText> : null}

        <Field>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            $invalid={Boolean(errors.name)}
          />
          {errors.name ? <ErrorText id="name-error">{errors.name}</ErrorText> : null}
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            $invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <ErrorText id="email-error">{errors.email}</ErrorText>
          ) : null}
        </Field>

        <Field>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            $invalid={Boolean(errors.message)}
          />
          {errors.message ? (
            <ErrorText id="message-error">{errors.message}</ErrorText>
          ) : null}
        </Field>

        <SubmitButton type="submit">Send Message</SubmitButton>
      </Form>
    </Page>
  );
}
