"use client";

import { Card, Button, Heading, Text, Flex, Box, Link } from "@radix-ui/themes";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { RiMailLine } from "@remixicon/react";
import styles from "./styles.module.scss";

const CheckEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [resentSuccess, setResentSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleResendEmail = async () => {
    setIsResending(true);
    setError("");
    setResentSuccess(false);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: "user@example.com", // Replace with actual user email
    });

    setIsResending(false);

    if (error) {
      setError(error.message);
    } else {
      setResentSuccess(true);
    }
  };

  return (
    <div className={styles.checkEmailContainer}>
      <div className={styles.cardContainer}>
        <Card className={styles.card} style={{ textAlign: "center" }}>
          {/* Icon */}
          <Box mb="4">
            <RiMailLine size={48} color="gray" />
          </Box>

          {/* Main Message */}
          <Heading mb="3">Check Your Email</Heading>
          <Text size="2" color="gray">
            We’ve sent a confirmation email to your inbox. Please click the link
            to verify your account.
          </Text>

          {/* Resend Email */}
          {resentSuccess ? (
            <Text color="green" mt="4">
              Email resent successfully! Check your inbox.
            </Text>
          ) : (
            <Button
              mt="4"
              variant="soft"
              disabled={isResending}
              onClick={handleResendEmail}
            >
              {isResending ? "Resending..." : "Resend Email"}
            </Button>
          )}

          {/* Error Message */}
          {error && (
            <Text color="red" mt="2">
              {error}
            </Text>
          )}

          {/* Back to Sign In */}
          <Flex mt="5" align="center" justify="center">
            <Text size="1">
              Already verified? <Link href="/signin">Sign in</Link>
            </Text>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default CheckEmail;
