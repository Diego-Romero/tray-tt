import { Button, Flex, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { CheckboxSingleControl } from "formik-chakra-ui";
import React from "react";
import { FormData } from "./Form";

interface Props {
  formData: FormData;
  updateForm: (values: FormData) => void;
}

export const updatesText = "Receive updates about Tray.io";
export const communicationsText = "Receive communications";

export const PrivacyForm: React.FC<Props> = ({ formData, updateForm }) => {
  return (
    <Stack width="100%">
      <Formik
        initialValues={formData}
        onSubmit={(values, actions) => {
          updateForm(values);
          actions.setSubmitting(false);
        }}
      >
        {(_props) => (
          <Form>
            <Stack
              spacing={2}
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <CheckboxSingleControl name="receiveUpdates">
                {updatesText}
              </CheckboxSingleControl>
              <CheckboxSingleControl name="receiveCommunication">
                {communicationsText}
              </CheckboxSingleControl>
            </Stack>
            <Flex alignItems="center" justifyContent="flex-end">
              <Button
                mt={20}
                mb={4}
                colorScheme="teal"
                variant="solid"
                size="sm"
                data-testid="user-submit"
                type="submit"
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
