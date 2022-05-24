import React, { useMemo } from 'react';
import { useAppSelector } from 'store/hooks';
import { Select, TextArea, CheckBox } from '../Forms';

interface IDynamicFormProps {
  name: string;
}

export const DynamicForm: React.FC<IDynamicFormProps> = ({ name }) => {
  const forms = useAppSelector(state => state.forms);
  const formMeta = useMemo(() => forms.find(f => f.name === name), [forms, name]);

  return (
    <form className="p-4">
      <h3>{formMeta?.displayName}</h3>
      {
        formMeta?.fieldsets.map((fieldset, i) =>
          <fieldset key={i}>
            <h4>{fieldset.displayName}</h4>
            {fieldset.fields?.map(field => {
              if (field.type === 'select') return <Select key={field.name} meta={field} />
              if (field.type === 'checkbox') return <CheckBox key={field.name} meta={field} />
              if (field.type === 'text') return <TextArea key={field.name} meta={field} />
              // TODO: add more cases for other types of input element.
              else return <span>Unknown input type</span>
            })}
          </fieldset>
        )
      }
    </form>
  )
}