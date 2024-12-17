"use client";

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

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <Heading mb="5">Sign in</Heading>
          <Box mb="5">
            <label>
              <Text size="2" as="div" weight="medium" mb="1">
                Email
              </Text>
              <TextField.Root placeholder="Enter your email" />
            </label>
          </Box>

          <Box mb="5" position="relative">
            <Flex align="baseline" justify="between" mb="1">
              <Text
                as="label"
                htmlFor="card-password-field"
                size="2"
                weight="medium"
              >
                Password
              </Text>
              <Link href="#" underline="auto" size="2">
                Forgot password?
              </Link>
            </Flex>

            {/* Input Field */}
            <TextField.Root
              id="card-password-field"
              placeholder="Enter your password"
              type="password"
              spellCheck="false"
              size="2"
              variant="surface"
            />
          </Box>
          <Flex mt="6" justify="end" gap="3">
            <Button variant="soft">Create an account</Button>
            <Button variant="solid">Sign in</Button>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default Login;
