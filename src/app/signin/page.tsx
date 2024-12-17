// src/app/login/page.tsx
import Login from "@/components/Login";
import { Container, Flex } from "@radix-ui/themes";
import React from "react";

const LoginPage = () => (
  <Container size="4" mx="5">
    <Flex direction="column" justify="center" height="100vh">
      <Login />
    </Flex>
  </Container>
);

export default LoginPage;
