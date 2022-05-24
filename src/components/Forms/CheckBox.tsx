import React from 'react';
import type { IFormElementBase } from 'types';
import { FormGroup } from './FormGroup';

export const CheckBox: React.FC<IFormElementBase> = ({ meta, value, onChange: handleOnChange }) => {
  return <FormGroup
    name={meta.name}
    label=""
    inputElement={
      <div className="flex items-center">
        <input
          data-testid={`${meta.type}-${meta.name}`}
          name={meta.name}
          id={meta.name}
          type="checkbox"
          checked={!!value}
          onChange={() => handleOnChange!(meta.name, !value)}
        />
        <label
          className="mb-0 ml-2"
          htmlFor={meta.name}
        >{meta.displayName}</label>
      </div>
    }
  />
}