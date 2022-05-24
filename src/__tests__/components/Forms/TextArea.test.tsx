import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { IFormField } from 'types';
import { TextArea } from "components/Forms/TextArea";

const metaData: IFormField = {
  name: "KnownErrorTypeId",
  displayName: "Knowledge Item Type",
  type: 'text',
  "x-options": [
    { "value": 1, "text": "FAQ" },
    { "value": 2, "text": "Advice" },
    { "value": 3, "text": "Known Error" }
  ],
};
const handleOnChange = jest.fn();
const text = 'Dummy Text';

describe("/components/Forms/TextArea", () => {
  beforeEach(() => {
    render(
      <TextArea
        meta={metaData}
        value={text}
        onChange={handleOnChange}
      />
    );
  })

  afterEach(cleanup)

  test('should render label and textarea', () => {
    // Arrange
    const labelElement = screen.getByText(new RegExp(metaData.displayName, 'i'));
    const textareaElement = screen.getByTestId(`${metaData.type}-${metaData.name}`) as HTMLTextAreaElement;

    // Assert
    expect(labelElement).toBeInTheDocument();
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement.value).toEqual(text.toString());
  });

  test('should trigger change listener', () => {
    // Arrange
    const textareaElement = screen.getByTestId(`${metaData.type}-${metaData.name}`) as HTMLTextAreaElement;
    const newValue = 'New Text';

    // Act
    fireEvent.change(textareaElement, { target: { value: newValue } });

    // Assert
    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });
});