import { render } from "../test-utils";
import { wait } from "@testing-library/react";
import { Form } from "./Form";
import userEvent from "@testing-library/user-event";

const validFields = {
  name: "user",
  email: "testing@mail.com",
  password: "Testing123!",
  role: "developer",
};

describe("Form", () => {
  describe("happy path", () => {
    test.only("should move from one step to the next", async () => {
      const { getByLabelText, getByTestId } = render(<Form />);
      const activeUserFormTab = getByTestId("header-User-active");
      expect(activeUserFormTab).toBeTruthy(); // checks that the current tab is active
      // fill and submit the user form
      const nameInput = getByLabelText("Name*");
      const emailInput = getByLabelText("Email*");
      const roleInput = getByLabelText("Role");
      const passwordInput = getByLabelText("Password*");
      userEvent.type(nameInput, validFields.name);
      userEvent.type(emailInput, validFields.email);
      userEvent.type(passwordInput, validFields.password);
      userEvent.type(roleInput, validFields.role);
      let submitButton = getByTestId("user-submit");
      userEvent.click(submitButton);
      await wait(); // this is necessary to avoid a more serious warning, known bug when using Formik

      const activePrivacyTab = getByTestId("header-Privacy-active");
      expect(activePrivacyTab).toBeTruthy(); // checks that the current tab is active
      submitButton = getByTestId("user-submit");
      userEvent.click(submitButton);
      await wait();

      const doneStepTab = getByTestId("header-Done-active");
      expect(doneStepTab).toBeTruthy(); // checks that the current tab is active
    });
  });
});
