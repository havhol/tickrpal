import SignUp from "@/components/Auth/SignUp";
import { Container, Flex } from "@radix-ui/themes";
import { signup } from "./actions"; // Import the formAction function

const SignUpPage = () => (
  <Container mx="5">
    <Flex direction="column" justify="center" height="100vh">
      <SignUp formAction={signup} /> {/* Pass formAction as a prop */}
    </Flex>
  </Container>
);

export default SignUpPage;
