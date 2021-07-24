import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { DoneStep } from "./DoneStep";
import { PrivacyForm } from "./PrivacyForm";
import { UserForm } from "./UserForm";

export interface FormData {
  email: string;
  name: string;
  role: string;
  password: string;
  receiveUpdates: boolean;
  receiveCommunications: boolean;
}

export const initialFormData: FormData = {
  email: "",
  name: "",
  password: "",
  role: "",
  receiveUpdates: true,
  receiveCommunications: false,
};

export const Form: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const updateForm = (values: FormData) => {
    setFormData(values);
    setStep(step + 1);
  };

  const formComponents = [
    {
      title: "User",
      component: <UserForm formData={formData} updateForm={updateForm} />,
    },
    {
      title: "Privacy",
      component: <PrivacyForm formData={formData} updateForm={updateForm} />,
    },
    {
      title: "Done",
      component: <DoneStep formData={formData} />,
    },
  ];

  return (
    <Box
      borderRadius="md"
      borderWidth="1px"
      minW="container.sm"
      bgColor="white"
    >
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-evenly"
        borderBottomWidth="1px"
      >
        {formComponents.map((component, index) => (
          <FormHeaderItem
            title={component.title}
            index={index}
            step={step}
            key={index}
          />
        ))}
      </Flex>
      <Flex alignItems="center" justifyContent="center" p={8} width="100%">
        {formComponents[step].component}
      </Flex>
    </Box>
  );
};

const FormHeaderItem: React.FC<{ title: string; index: number; step: number }> =
  ({ title, index, step }) => (
    <Flex
      variant="ghost"
      p={2}
      bgColor={step === index ? "gray.100" : "white"}
      cursor="default"
      borderRightWidth="1px"
      width="100%"
      alignItems="center"
      justifyContent="center"
      data-testid={`header-${title}-${step === index ? "active" : "inactive"}`}
    >
      {title}
    </Flex>
  );
