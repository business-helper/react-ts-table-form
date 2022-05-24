import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormGroup } from "components/Forms/FormGroup";

describe("/components/Forms/FormGroup", () => {
  test("Should render label and input element", () => {
    // Arrange
    const inputTestId = 'form-group-input-tmp';
    const labelText = 'Form Group Label';
    const formGroupName = 'test';
    render(
      <FormGroup
        name={formGroupName}
        label={labelText}
        inputElement={<input data-testid={inputTestId} />}
      />
    );
    const labelElement = screen.getByTestId(`form-group-label-${formGroupName}`);
    const inputElement = screen.getByTestId(inputTestId);

    // Assert
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });
});
