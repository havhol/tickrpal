"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
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
import styles from "./styles.module.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Attempt to sign in with Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
    } else {
      // Redirect to a secure route upon successful sign-in
      router.push("/dashboard"); // Replace with your secure route
    }

    setLoading(false);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <Box mb="5" style={{ textAlign: "center" }}>
            <Heading mb="1" size="4">
              Sign in to Tickrpal
            </Heading>
            <Text size="2" color="gray">
              Welcome back! Please sign in to continue
            </Text>
          </Box>

          {/* Email Input */}
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

          {/* Password Input */}
          <Box mb="5">
            <label>
              <Text size="2" as="div" weight="medium" mb="1">
                Password
              </Text>
              <TextField.Root
                placeholder="Enter your password"
                type="password"
                spellCheck="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </Box>

          {/* Error Message */}
          {error && (
            <Text size="2" color="red" mb="4">
              {error}
            </Text>
          )}

          {/* Sign In Button */}
          <Flex mt="6">
            <Button
              variant="solid"
              style={{ width: "100%" }}
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Continue"}
            </Button>
          </Flex>

          {/* Footer Links */}
          <Flex mt="6" align="center" justify="center">
            <Text size="2">
              Don't have an account?{" "}
              <Link href="/signup" weight="bold">
                Sign up
              </Link>
            </Text>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
