import React, { useMemo, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { ItemList } from 'components/ItemList';
import { DynamicForm } from 'components/DynamicForm';
import styles from './index.module.scss';

export const HomePage: React.FC = () => {
  const items = useAppSelector(state => state.items);
  const [activeRow, setActiveRow] = useState<string>(''); // entity.data.number

  const selectedRowData = useMemo(() => {
    const item = items.find(it => it.entity.data.number === activeRow);
    return {
      KnownErrorTypeId: item?.entity.data.type.id,
      Status: item?.entity.data.status.id,
      IsPrivate: item?.entity.data.isPrivate,
      Summary: item?.entity.data.summary,
    };
  }, [activeRow, items]);

  const handleOnFormSubmit = (data: any) => {
    // TODO: describe actions to submit 'data'.
  }

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
          values={selectedRowData}
          onSubmit={handleOnFormSubmit}
          onCancel={() => setActiveRow('')}
        />
      </div>
    </div>
  )
}