import {
  Button,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputControl } from "formik-chakra-ui";
import React from "react";
import * as Yup from "yup";
import { FormData } from "./Form";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email("Invalid Email").required(),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/,
      "Must Contain 10 Characters, One Uppercase, One Lowercase and One Number"
    ),
});

interface Props {
  formData: FormData;
  updateForm: (values: FormData) => void;
}

export const userFormPlaceholders = {
  name: "name",
  mail: "your@mail.com",
  password: "",
  role: "developer",
};

export const UserForm: React.FC<Props> = ({ formData, updateForm }) => {
  return (
    <Stack width="100%">
      <Formik
        initialValues={formData}
        onSubmit={(values, actions) => {
          actions.resetForm();
          updateForm(values);
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {(_props) => (
          <Form>
            <Stack spacing={4}>
              <InputControl
                name="name"
                label="Name"
                isRequired
                inputProps={{ placeholder: userFormPlaceholders.name }}
              />
              <InputControl name="role" label="Role" />
              <InputControl
                name="email"
                label="Email"
                isRequired
                inputProps={{
                  type: "email",
                  placeholder: userFormPlaceholders.mail,
                }}
              />
              <InputControl
                name="password"
                label="Password"
                isRequired
                inputProps={{
                  type: "password",
                  placeholder: userFormPlaceholders.password,
                }}
              />
            </Stack>
            <Flex alignItems="center" justifyContent="flex-end">
              <Button
                mt={8}
                mb={4}
                colorScheme="teal"
                variant="solid"
                size="sm"
                type="submit"
                data-testid="user-submit"
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
