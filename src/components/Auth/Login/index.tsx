"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import routes from "@/routes";
import * as Form from "@radix-ui/react-form";
import { Card, Heading, Text, Box, Flex, Button, Link } from "@radix-ui/themes";
import styles from "./styles.module.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password."); // Show error message
    } else {
      router.push(routes.dashboard); // Redirect on success
    }
  };

  return (
    <Card className={styles.card} variant="surface">
      <Box mb="5" style={{ textAlign: "center" }}>
        <Heading mb="1" size="4">
          Sign in to Tickrpal
        </Heading>
        <Text size="1" color="gray">
          Welcome back! Please sign in to continue
        </Text>
      </Box>

      <Form.Root className={styles.form} onSubmit={handleLogin}>
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
            disabled={loading}
            loading={loading}
          >
            {loading ? "Signing in..." : "Continue"}
          </Button>
        </Form.Submit>
      </Form.Root>

      {/* Footer Links */}
      <Flex mt="6" align="center" justify="center">
        <Text size="2">
          <span className={styles.textSpan}>Don&apos;t have an account? </span>
          <Link href={routes.auth.signUp} weight="bold" color="blue">
            Sign up
          </Link>
        </Text>
      </Flex>
    </Card>
  );
};

export default Login;
