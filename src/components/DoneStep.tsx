import { CheckIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FormData } from "./Form";

interface Props {
  formData: FormData;
}

export const doneText =
  "Please verify your email address, you should have received etc....";

export const DoneStep: React.FC<Props> = ({ formData }) => {
  console.log(formData);
  return (
    <Stack width="100%">
      <Stack width="100%" alignItems="center" justifyContent="center">
        <CheckIcon w={12} h={12} color="green" />
        <Text color="green">{doneText}</Text>
      </Stack>
    </Stack>
  );
};
