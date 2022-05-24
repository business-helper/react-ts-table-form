import React from 'react';
import type { IFormElementBase } from 'types';
import { FormGroup } from './FormGroup';

export const TextArea: React.FC<IFormElementBase> = ({ meta, value, onChange: handleOnChange }) => {
  return <FormGroup
    label={meta.displayName}
    inputElement={
      <textarea
        data-testid="textarea-element"
        name={meta.name}
        value={value}
        onChange={handleOnChange}
      >
        {value}
      </textarea>
    }
  />
}