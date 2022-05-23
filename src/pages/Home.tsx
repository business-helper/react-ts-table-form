import React from 'react';
import { useAppSelector } from 'store/hooks';
import { ItemList } from 'components/ItemList';

export const HomePage: React.FC = () => {
  const items = useAppSelector(state => state.items);
  return (
    <>
      <div className="flex justify-start">
        <ItemList items={items} />
      </div>
    </>
  )
}