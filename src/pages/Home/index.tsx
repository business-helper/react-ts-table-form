import React, { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { ItemList } from 'components/ItemList';
import { DynamicForm } from 'components/DynamicForm';
import styles from './index.module.scss';

export const HomePage: React.FC = () => {
  const items = useAppSelector(state => state.items);
  const [activeRow, setActiveRow] = useState<string>('');

  return (
    <div className="flex">
      <div className={activeRow ? styles.tableWrapper : 'w-full'}>
        <ItemList
          items={items}
          onSelectRow={(identifier) => setActiveRow(identifier)}
        />
      </div>
      <div className={activeRow ? styles.formWrapper : 'hidden'}>
        <DynamicForm
          name="updateKnowledgeItemBasicDetails"
        />
      </div>
    </div>
  )
}