import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { IFormField } from 'types';
import { Select } from "components/Forms/Select";

const metaData: IFormField = {
  name: "KnownErrorTypeId",
  displayName: "Knowledge Item Type",
  type: 'select',
  "x-options": [
    { "value": 1, "text": "FAQ" },
    { "value": 2, "text": "Advice" },
    { "value": 3, "text": "Known Error" }
  ],
};
const handleOnChange = jest.fn();
const selected = 1;

describe("/components/Forms/Select", () => {
  beforeEach(() => {
    render(<Select
      meta={metaData}
      value={selected}
      onChange={handleOnChange}
    />);
  })

  afterEach(cleanup)

  test('should render label and select', () => {
    // Arrange
    const labelElement = screen.getByText(new RegExp(metaData.displayName, 'i'));
    const selectElement = screen.getByTestId(`${metaData.type}-${metaData.name}`) as HTMLSelectElement;

    // Assert
    expect(labelElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.value).toEqual(selected.toString());
  });

  test('should render options properly', () => {
    metaData["x-options"]!.map(option => {
      // Arrange
      const optionElement = screen.getByTestId(`${metaData.type}-${metaData.name}-${option.value}`);

      // Assert
      expect(optionElement).toBeInTheDocument();
    })
  });

  test('should trigger change listener on clicking unselected option', () => {
    // Arrange
    const selectElement = screen.getByTestId(`${metaData.type}-${metaData.name}`) as HTMLSelectElement;

    // Act
    fireEvent.change(selectElement, { target: { value: 2 } });

    // Assert
    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });
});