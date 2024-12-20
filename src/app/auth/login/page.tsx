import Login from "@/components/Auth/Login"; // Import the SignIn component
import { Container, Flex } from "@radix-ui/themes";

const LoginPage = () => (
  <Container size="4" mx="5">
    <Flex direction="column" justify="center" height="100vh">
      <Login />
    </Flex>
  </Container>
);

export default LoginPage;
