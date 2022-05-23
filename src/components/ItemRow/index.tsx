import React from 'react';
import { IItem } from 'types';

interface IItemRowProps {
  item: IItem;
}

export const ItemRow: React.FC<IItemRowProps> = ({ item }) => {
  return (
    <div>
      {item.entity.name}
    </div>
  )
}