import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { IForm } from 'types';
import { DynamicForm } from "components/DynamicForm";;

const formMetaData: IForm = {
  "name": "updateKnowledgeItemBasicDetails",
  "displayName": "Update Knowledge Item Basic Details",
  "fieldsets": [
    {
      "displayName": "Basic Details",
      "fields": [
        {
          "name": "KnownErrorTypeId",
          "displayName": "Knowledge Item Type",
          "type": "select",
          "x-options": [
            { "value": 1, "text": "FAQ" },
            { "value": 2, "text": "Advice" },
            { "value": 3, "text": "Known Error" }
          ]
        },
        {
          "name": "Status",
          "displayName": "Lifecycle Status",
          "type": "select",
          "x-options": [
            { "value": 1, "text": "Published" },
            { "value": 2, "text": "Planned" },
            { "value": 3, "text": "Retired" }
          ]
        },
        {
          "name": "IsPrivate",
          "displayName": "Is Private?",
          "type": "checkbox"
        },
        {
          "name": "Summary",
          "displayName": "Summary",
          "type": "text"
        }
      ]
    }
  ]
};

const formValues = {
  KnownErrorTypeId: 1,
  Status: 2,
  IsPrivate: true,
  Summary: 'Auto Test KI Summary',
};

const handleOnSubmit = jest.fn();
const handleOnCancel = jest.fn();

describe("/components/Forms/TextArea", () => {
  beforeEach(() => {
    render(
      <DynamicForm
        meta={formMetaData}
        values={formValues}
        onSubmit={handleOnSubmit}
        onCancel={handleOnCancel}
      />
    );
  })

  afterEach(cleanup)

  test('should render form and title', () => {
    // Arrange
    const formElement = screen.getByTestId(`form-${formMetaData.name}`);
    const formTitle = screen.getByTestId(`form-title-${formMetaData.name}`);

    // Assert
    expect(formElement).toBeInTheDocument();
    expect(formTitle).toBeInTheDocument();
  });

  test('should render form groups properly', () => {
    formMetaData.fieldsets.map(fieldset => {
      fieldset.fields.map(field => {
        // Arrange
        const labelElement = screen.getByTestId(`form-group-label-${field.name}`);
        const inputElement = screen.getByTestId(`${field.type}-${field.name}`);

        // Assert
        expect(labelElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
      });
    });
  });
});
