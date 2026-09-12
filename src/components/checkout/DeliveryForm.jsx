"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  emptyDeliveryInfo,
  selectDeliveryInfo,
  setDeliveryInfo,
} from "../../store/slices/checkoutSlice";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

function validate(values) {
  const nextErrors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!value.trim()) {
      nextErrors[key] = "This field is required.";
    }
  });

  if (
    values.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    nextErrors.email = "Please enter a valid email address.";
  }

  return nextErrors;
}

export default function DeliveryForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const savedDelivery = useSelector(selectDeliveryInfo);
  const [values, setValues] = useState({
    ...emptyDeliveryInfo,
    ...savedDelivery,
  });
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    dispatch(setDeliveryInfo(values));
    router.push("/checkout/payment");
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Grid>
        <Input
          label="Full Name"
          name="fullName"
          value={values.fullName}
          error={errors.fullName}
          required
          onChange={updateField}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          error={errors.email}
          required
          onChange={updateField}
        />
        <Input
          label="Phone"
          name="phone"
          value={values.phone}
          error={errors.phone}
          required
          onChange={updateField}
        />
        <Input
          label="City"
          name="city"
          value={values.city}
          error={errors.city}
          required
          onChange={updateField}
        />
        <Input
          label="Address"
          name="address"
          value={values.address}
          error={errors.address}
          required
          onChange={updateField}
        />
        <Input
          label="Postal Code"
          name="postalCode"
          value={values.postalCode}
          error={errors.postalCode}
          required
          onChange={updateField}
        />
      </Grid>
      <Actions>
        <Button type="submit" size="large">
          Continue to Payment
        </Button>
      </Actions>
    </Form>
  );
}
