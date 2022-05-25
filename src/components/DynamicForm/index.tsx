import React, { useEffect, useState } from 'react';
import type { IForm } from 'types';
import { Select, TextArea, CheckBox } from '../Forms';

interface IDynamicFormProps {
  meta: IForm;
  values?: any;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export const DynamicForm: React.FC<IDynamicFormProps> = ({ meta, values, onCancel: handleOnCancel, onSubmit: _handleOnSubmit }) => {
  const [formData, setFormData] = useState(values);

  const handleOnChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleOnChangeByKeyValue = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    _handleOnSubmit(formData);
  }

  useEffect(() => {
    setFormData(values);
  }, [values])

  if (!meta) return null;

  return (
    <form
      data-testid={`form-${meta.name}`}
      className="p-4 bg-gray-200"
      onSubmit={handleOnSubmit}
    >
      <h3
        data-testid={`form-title-${meta.name}`}
        className="text-center text-xl font-bold mb-6"
      >
        {meta?.displayName}
      </h3>
      {
        meta?.fieldsets.map((fieldset, i) =>
          <fieldset key={i}>
            <h4 className="text-lg font-semibold">{fieldset.displayName}</h4>
            {fieldset.fields?.map(field => {
              if (field.type === 'select')
                return <Select
                  key={field.name}
                  value={formData[field.name]}
                  onChange={handleOnChange}
                  meta={field}
                />
              else if (field.type === 'checkbox')
                return <CheckBox
                  key={field.name}
                  value={formData[field.name]}
                  onChange={handleOnChangeByKeyValue}
                  meta={field}
                />
              else if (field.type === 'text')
                return <TextArea
                  key={field.name}
                  value={formData[field.name]}
                  onChange={handleOnChange}
                  meta={field}
                />
              // TODO: add more cases for other types of input element.
              else return <span key={field.name}>Unknown input type</span>
            })}
          </fieldset>
        )
      }
      <div className="flex justify-around items-center">
        <button
          className="button"
          type="submit">Submit</button>
        <button
          className="button"
          type="button"
          onClick={handleOnCancel}>Cancel</button>
      </div>
    </form>
  )
}