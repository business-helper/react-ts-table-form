import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table'
import type { IItem } from 'types';
import { ItemRow } from '../ItemRow';
import styles from './index.module.scss';

interface IItemListProps {
  items: IItem[];
}

interface IItemDemo {
  col1: string;
  col2: string;
}

interface IRowData {
  id: number;
  type: string;
  summary: string;
  isPrivate: boolean;
  status: string;
  service?: string;
  author: string;
  createdOn: string;
  updatedOn: string;
}

export const ItemList: React.FC<IItemListProps> = ({ items }) => {
  const data: IRowData[] = useMemo(() => items.map(item => {
    const { entity: { data } } = item;
    return {
      id: data.id,
      type: `${data.type.prefix}-${data.type.id}`,
      summary: data.summary,
      isPrivate: data.isPrivate,
      status: data.status.name,
      service: data.service?.name,
      author: data.author.name,
      createdOn: data.createdOn,
      updatedOn: data.updatedOn,
    }
  }), [items])

  const columns: readonly Column<IRowData>[] = React.useMemo(
    () => [
      {
        Header: 'Type #',
        accessor: 'type', // accessor is the "key" in the data
      },
      {
        Header: 'Summary',
        accessor: 'summary',
      },
      {
        Header: 'Private',
        accessor: 'isPrivate',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Service',
        accessor: 'service',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
      {
        Header: 'Created',
        accessor: 'createdOn',
      },
      // {
      //   Header: 'Updated',
      //   accessor: 'updatedOn',
      // },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="whitespace-nowrap" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}