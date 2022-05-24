import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { Select, TextArea, CheckBox } from '../Forms';

interface IDynamicFormProps {
  name: string;
  values?: any;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export const DynamicForm: React.FC<IDynamicFormProps> = ({ name, values, onCancel: handleOnCancel, onSubmit: _handleOnSubmit }) => {
  const forms = useAppSelector(state => state.forms);
  const formMeta = useMemo(() => forms.find(f => f.name === name), [forms, name]);
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

  return (
    <form className="p-4 bg-gray-200" onSubmit={handleOnSubmit}>
      <h3 className="text-center text-xl font-bold mb-6">{formMeta?.displayName}</h3>
      {
        formMeta?.fieldsets.map((fieldset, i) =>
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