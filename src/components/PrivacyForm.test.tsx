import userEvent from "@testing-library/user-event";
import { render, waitFor } from "../test-utils";
import { initialFormData } from "./Form";
import { communicationsText, PrivacyForm, updatesText } from "./PrivacyForm";

describe("Privacy form test", () => {
  const handleSubmit = jest.fn();
  const { getByText, getByTestId } = render(
    <PrivacyForm formData={initialFormData} updateForm={handleSubmit} />
  );
  const updatesInput = getByText(updatesText);
  const communicationsInput = getByText(communicationsText);

  test("should work regardless if they are selected", async () => {
		expect(updatesInput).toBeTruthy();
    expect(communicationsInput).toBeTruthy();
    const submitButton = getByTestId("user-submit");
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
