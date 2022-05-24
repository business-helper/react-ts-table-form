import React from 'react';
import type { IFormElementBase } from 'types';
import { FormGroup } from './FormGroup';

export const Select: React.FC<IFormElementBase> = ({ meta, value, onChange: handleOnChange }) => {
  return <FormGroup
    label={meta.displayName}
    inputElement={
      <select
        data-testid="select-element"
        name={meta.name}
        value={value}
        onChange={handleOnChange}
      >
        {
          meta['x-options']?.map((option, i) =>
            <option
              data-testid={`select-option-${option.value}`}
              key={i}
              value={option.value}
            >
              {option.text}
            </option>)
        }
      </select>
    }
  />
}