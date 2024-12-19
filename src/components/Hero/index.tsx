"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { RiArrowRightLine } from "@remixicon/react";

const Hero = () => {
  return (
    <Container size="4" mx="5">
      <Flex direction="column" justify="center" height="100vh">
        <Box mb="5">
          <Text>Case studies</Text>
          <Heading as="h2" size="7" style={{ maxWidth: "500px" }}>
            World-class teams use Radix Primitives to power their products.
            Convince yourself not others.
          </Heading>
        </Box>

        <Grid columns={{ initial: "1", sm: "2" }} gap="5" mb="6">
          <Text size="3" mb="4" style={{ textIndent: "-0.5em" }}>
            Scandinavian born. First market out, the Norwegian stock exchange.
            (OSEBX).
          </Text>
        </Grid>

        <Flex
          direction={{ initial: "column", xs: "row" }} // Responsive flex direction
          gap="4"
        >
          {/* Get Started Button */}
          <Button
            variant="solid"
            highContrast
            size={{ initial: "3", xs: "4" }}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            asChild
          >
            <Link
              href="/themes/docs/overview/getting-started"
              style={{ flexGrow: 1 }}
            >
              Get started
              <RiArrowRightLine size={16} style={{ marginRight: "-3px" }} />
            </Link>
          </Button>

          {/* Playground Button */}
          <Button
            variant="soft"
            highContrast
            size={{ initial: "3", xs: "4" }}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            asChild
          >
            <Link href="/themes/playground" style={{ flexGrow: 1 }}>
              <RiArrowRightLine size={18} />
              Playground
            </Link>
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Hero;
