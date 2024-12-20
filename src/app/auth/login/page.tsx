import SignIn from "@/components/SignIn"; // Import the SignIn component
import { Container, Flex } from "@radix-ui/themes";

const LoginPage = () => (
  <Container size="4" mx="5">
    <Flex direction="column" justify="center" height="100vh">
      <SignIn /> {/* Pass formAction as a prop */}
    </Flex>
  </Container>
);

export default LoginPage;
