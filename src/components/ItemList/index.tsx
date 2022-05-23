import React, { useMemo, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import { useResizeDetector } from 'react-resize-detector';
import type { IItem } from 'types';
import styles from './index.module.scss';

interface IItemListProps {
  items: IItem[];
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

const hideColumnConfig: { [key: string]: number } = {
  'Summary': 400,
  'Author': 600,
  'Service': 768,
  'Updated': 800,
  'Created': 1024,
};

export const ItemList: React.FC<IItemListProps> = ({ items }) => {
  const { width, ref } = useResizeDetector();

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
        accessor: 'type', // accessor is the "key" in the data.
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
        maxWidth: 100,
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
      {
        Header: 'Updated',
        accessor: 'updatedOn',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    allColumns,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  useEffect(() => {
    Object.keys(hideColumnConfig)
      .forEach(headerName => allColumns
        .find(col => col.Header === headerName)?.toggleHidden(width! < hideColumnConfig[headerName]));
  }, [width]);

  return (
    <div ref={ref} className="w-full">
      <table className={styles.table} {...getTableProps()}>
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
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className="whitespace-nowrap text-ellipsis overflow-hidden px-3" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}