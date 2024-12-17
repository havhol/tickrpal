// src/app/login/page.tsx
import SignUp from "@/app/components/SignUp";
import { Container, Flex } from "@radix-ui/themes";

const SignUpPage = () => (
  <Container size="4" mx="5">
    <Flex direction="column" justify="center" height="100vh">
      <SignUp />
    </Flex>
  </Container>
);

export default SignUpPage;
