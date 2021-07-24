import { render } from "../test-utils";
import { UserForm } from "./UserForm";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { initialFormData } from "./Form";

const validFields = {
  name: "user",
  email: "testing@mail.com",
  password: "Testing123!",
  role: "developer",
};

describe("User form", () => {
  const handleSubmit = jest.fn();
  const { getByTestId, getByLabelText } = render(
    <UserForm formData={initialFormData} updateForm={handleSubmit} />
  );
  const nameInput = getByLabelText("Name*");
  const emailInput = getByLabelText("Email*");
  const roleInput = getByLabelText("Role");
  const passwordInput = getByLabelText("Password*");
  const submitButton = getByTestId("user-submit");

  describe("is valid", () => {
    test("should call handleSubmit if all the fields are correct", async () => {
      userEvent.type(nameInput, validFields.name);
      userEvent.type(emailInput, validFields.email);
      userEvent.type(passwordInput, validFields.password);
      userEvent.type(roleInput, validFields.role);
      userEvent.click(submitButton);
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("is invalid", () => {
    describe("name input", () => {
      test("should not submit if empty", async () => {
        userEvent.type(emailInput, validFields.email);
        userEvent.type(passwordInput, validFields.password);
        userEvent.type(roleInput, validFields.role);
        userEvent.click(submitButton);
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(0);
        });
      });
    });
    describe("email input", () => {
      test("should not submit if empty", async () => {
        userEvent.type(nameInput, validFields.name);
        // userEvent.type(emailInput, validFields.email);
        userEvent.type(passwordInput, validFields.password);
        userEvent.type(roleInput, validFields.role);
        userEvent.click(submitButton);
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(0);
        });
      });
      test("should not submit if is not valid", async () => {
        userEvent.type(nameInput, validFields.name);
        userEvent.type(emailInput, "user.com");
        userEvent.type(passwordInput, validFields.password);
        userEvent.type(roleInput, validFields.role);
        userEvent.click(submitButton);
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(0);
        });
      });
    });
    describe("password input", () => {
      test("should not submit if empty", async () => {
        userEvent.type(nameInput, validFields.name);
        userEvent.type(emailInput, validFields.email);
        // userEvent.type(passwordInput, validFields.password);
        userEvent.type(roleInput, validFields.role);
        userEvent.click(submitButton);
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(0);
        });
      });
      test("should not submit if is missing letters", async () => {
        userEvent.type(nameInput, validFields.name);
        userEvent.type(emailInput, validFields.email);
        userEvent.type(passwordInput, "123456789!");
        userEvent.type(roleInput, validFields.role);
        userEvent.click(submitButton);
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(0);
        });
      });
      test("should not submit if is missing uppercase", async () => {
        userEvent.type(nameInput, validFields.name);
        userEvent.type(emailInput, validFields.email);
        userEvent.type(passwordInput, "testing123!");
        userEvent.type(roleInput, validFields.role);
        userEvent.click(submitButton);
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(0);
        });
      });
      test("should not submit if is missing lowercase", async () => {
        userEvent.type(nameInput, validFields.name);
        userEvent.type(emailInput, validFields.email);
        userEvent.type(passwordInput, "TESTING123!");
        userEvent.type(roleInput, validFields.role);
        userEvent.click(submitButton);
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(0);
        });
      });
      test("should not submit if is missing a special character", async () => {
        userEvent.type(nameInput, validFields.name);
        userEvent.type(emailInput, validFields.email);
        userEvent.type(passwordInput, "testing123");
        userEvent.type(roleInput, validFields.role);
        userEvent.click(submitButton);
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
