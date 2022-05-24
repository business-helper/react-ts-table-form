import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormGroup } from "components/Forms/FormGroup";

describe("/components/Forms/FormGroup", () => {
  test("Should render label and input element", () => {
    // Arrange
    const inputTestId = 'form-group-input-tmp';
    const labelText = 'Form Group Label';
    render(<FormGroup
      label={labelText}
      inputElement={<input data-testid={inputTestId} />}
    />);
    const labelElement = screen.getByText(new RegExp(labelText, 'i'));
    const inputElement = screen.getByTestId(inputTestId);

    // Assert
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });
});
