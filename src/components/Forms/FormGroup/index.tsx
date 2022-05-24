import React from 'react';
import styles from './index.module.scss';

interface IFormGroup {
  label: string;
  inputElement: React.ReactNode;
}

export const FormGroup: React.FC<IFormGroup> = ({ label, inputElement }) => {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <div>{inputElement}</div>
    </div>
  );
}
