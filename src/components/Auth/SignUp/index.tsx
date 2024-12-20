"use client";

import routes from "@/routes";
import * as Form from "@radix-ui/react-form";
import { Box, Button, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { useState } from "react";
import styles from "./styles.module.scss";

interface SignUpProps {
  formAction: (formData: FormData) => Promise<void>; // Accepts a formAction function
}

const SignUp = ({ formAction }: SignUpProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      await formAction(formData); // Use the provided formAction
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={styles.card} variant="surface">
      <Box mb="5" style={{ textAlign: "center" }}>
        <Heading mb="1" size="4">
          Create your account
        </Heading>
        <Text size="1" color="gray">
          Welcome! Please fill in the details to get started.
        </Text>
      </Box>

      <Form.Root className={styles.form} onSubmit={handleSubmit}>
        {/* Email Field */}
        <Form.Field name="email">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className={styles.formLabel}>Email</Form.Label>
            <Form.Message className={styles.formMessage} match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className={styles.formMessage} match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className={styles.input}
              type="email"
              required
              placeholder="Enter your email"
            />
          </Form.Control>
        </Form.Field>

        {/* Password Field */}
        <Form.Field className={styles.formField} name="password">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <Form.Message className={styles.formMessage} match="valueMissing">
              Please enter your password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className={styles.input}
              type="password"
              required
              placeholder="Enter your password"
            />
          </Form.Control>
        </Form.Field>

        {/* Error Message */}
        {error && (
          <Text size="2" color="red" mb="4">
            {error}
          </Text>
        )}

        {/* Sign In Button */}
        <Form.Submit asChild>
          <Button
            variant="solid"
            style={{ width: "100%" }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Continue"}
          </Button>
        </Form.Submit>
      </Form.Root>

      <Flex mt="6" align="center" justify="center">
        <Text size="2">
          <span className={styles.textSpan}>Already have an account? </span>
          <Link href={routes.auth.signIn} weight="bold">
            Sign in
          </Link>
        </Text>
      </Flex>
    </Card>
  );
};

export default SignUp;
