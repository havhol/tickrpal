"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import routes from "@/routes";
import {
  Card,
  TextField,
  Button,
  Heading,
  Text,
  Link,
  Box,
  Flex,
} from "@radix-ui/themes";
import { useState } from "react";
import styles from "./styles.module.scss";

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    const { error } = await supabase.auth.signUp({ email, password });

    setIsSubmitting(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      router.push(routes.auth.checkEmail); // Redirect to a confirmation page
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <Box mb="5" style={{ textAlign: "center" }}>
            <Heading mb="1" size="4">
              Create your account
            </Heading>
            <Text size="2" color="gray">
              Welcome! Please fill in the details to get started.
            </Text>
          </Box>

          {success ? (
            <Text color="green" align="center">
              Check your email to verify your account!
            </Text>
          ) : (
            <>
              {/* Email Field */}
              <Box mb="5">
                <label>
                  <Text size="2" as="div" weight="medium" mb="1">
                    Email
                  </Text>
                  <TextField.Root
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </Box>

              {/* Password Field */}
              <Box mb="5">
                <label>
                  <Text size="2" as="div" weight="medium" mb="1">
                    Password
                  </Text>
                  <TextField.Root
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </Box>

              {error && <Text color="red">{error}</Text>}

              <Flex mt="6">
                <Button
                  variant="solid"
                  style={{ width: "100%" }}
                  onClick={handleSignUp}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Continue"}
                </Button>
              </Flex>
            </>
          )}

          <Flex mt="6" align="center" justify="center">
            <Text size="2">
              Already have an account?{" "}
              <Link href={routes.auth.signIn} weight="bold">
                Sign in
              </Link>
            </Text>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
