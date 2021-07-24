import React from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { Form } from "./components/Form";

function App() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      bgGradient="linear(to-r, green.200, pink.500)"
    >
      <Stack maxW="container.sm" spacing="8">
        <Heading textAlign="center" color="white">
          Tray.io tech test!
        </Heading>
        <Form />
      </Stack>
    </Flex>
  );
}

export default App;
