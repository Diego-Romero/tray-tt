import { render } from "../test-utils";
import { DoneStep, doneText } from "./DoneStep";
import { initialFormData } from "./Form";

describe("Done Step", () => {
  const { getByText } = render(<DoneStep formData={initialFormData} />);

  test("should display the right text", async () => {
    expect(getByText(doneText)).toBeTruthy();
  });
});
