import { signup } from "./actions";

export default function SignUpPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={signup}>Sign up</button>
    </form>
  );
}

// import SignUp from "@/components/SignUp";
// import { Container, Flex } from "@radix-ui/themes";

// const SignUpPage = () => (
//   <Container size="4" mx="5">
//     <Flex direction="column" justify="center" height="100vh">
//       {/* <SignUp /> */}
//     </Flex>
//   </Container>
// );

// export default SignUpPage;
