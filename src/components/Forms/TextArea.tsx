import React from 'react';
import type { IFormElementBase } from 'types';
import { FormGroup } from './FormGroup';

export const TextArea: React.FC<IFormElementBase> = ({ meta, value }) => {
  return <FormGroup
    label={meta.displayName}
    inputElement={
      <textarea
        name={meta.name}
      >
        {value}
      </textarea>
    }
  />
}