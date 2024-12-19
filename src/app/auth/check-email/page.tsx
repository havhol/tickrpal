"use client";

// import CenteredContent from "@/components/CenteredContent";
// import { supabase } from "@/lib/supabaseClient";
// import { Box, Button, Card, Text } from "@radix-ui/themes";
// import { useState } from "react";

const CheckEmail = () => {
  // const [isResending, setIsResending] = useState(false);
  // const [resentSuccess, setResentSuccess] = useState(false);
  // const [error, setError] = useState("");

  // const handleResendEmail = async () => {
  //   setIsResending(true);
  //   setError("");
  //   setResentSuccess(false);

  //   const { error } = await supabase.auth.resend({
  //     type: "signup",
  //     email: "user@example.com", // Replace with actual user email
  //   });

  //   setIsResending(false);

  //   if (error) {
  //     setError(error.message);
  //   } else {
  //     setResentSuccess(true);
  //   }
  // };

  return (
    <p>check email</p>
    // <CenteredContent>
    //   <Card variant="surface">
    //     <Box style={{ textAlign: "center" }}>
    //       <Text as="div" size="3" weight="bold">
    //         Check your email
    //       </Text>
    //       <Text as="div" color="gray" size="2">
    //         Please make sure you verify your account
    //       </Text>
    //       <Button mt="5">Resend email</Button>
    //     </Box>
    //   </Card>
    // </CenteredContent>
  );
};

export default CheckEmail;
