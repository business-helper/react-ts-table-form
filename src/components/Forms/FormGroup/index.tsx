import React from 'react';
import styles from './index.module.scss';

interface IFormGroup {
  label: string;
  name: string;
  inputElement: React.ReactNode;
}

export const FormGroup: React.FC<IFormGroup> = ({ name, label, inputElement }) => {
  return (
    <div className={styles.formGroup}>
      <label data-testid={`form-group-label-${name}`}>{label}</label>
      <div>{inputElement}</div>
    </div>
  );
}
