import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CheckBox } from "components/Forms/CheckBox";
import { IFormField } from 'types';

const metaData: IFormField = {
  name: "tmpIsPrivate",
  displayName: "Is Private?",
  type: 'checkbox',
};
const checked = true;
const handleOnChange = jest.fn();

describe("/components/Forms/CheckBox", () => {
  beforeEach(() => {
    render(<CheckBox
      meta={metaData}
      value={checked}
      onChange={handleOnChange}
    />);
  })

  afterEach(cleanup)

  test('should render label and checkbox', () => {
    // Arrange
    const labelElement = screen.getByText(new RegExp(metaData.displayName, 'i'));
    const checkBox = screen.getByLabelText(new RegExp(metaData.displayName, 'i')) as HTMLInputElement;

    // Assert
    expect(labelElement).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
    expect(checkBox.checked).toEqual(checked);
  });

  test('should trigger change listener on clicking label or checkbox', () => {
    // Arrange
    const labelElement = screen.getByText(new RegExp(metaData.displayName, 'i'));
    const checkBox = screen.getByLabelText(new RegExp(metaData.displayName, 'i')) as HTMLInputElement;

    // Act
    fireEvent.click(checkBox);
    fireEvent.click(labelElement);

    // Assert
    expect(handleOnChange).toHaveBeenCalledTimes(2);
  });
});