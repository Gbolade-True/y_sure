import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExpandableConfig } from 'antd/es/table/interface';

export interface TableCellRender {
  repr: string;
  render: React.ReactNode;
}

export type TableData = {
  key: string;
  [key: string]: any;
};

interface TableProps {
  data: TableData[];
  onPaginationChange: (page: number, pageSize: number) => void;
  total: number;
  pageSize?: number;
  loading?: boolean;
  columns: ColumnsType<TableData>;
  expandable?: ExpandableConfig<TableData>;
}

export const YTable = ({
  columns,
  data,
  loading,
  onPaginationChange,
  total,
  pageSize = 25,
  expandable,
}: TableProps) => (
  <Table
    columns={columns}
    dataSource={data}
    loading={loading}
    pagination={{ onChange: onPaginationChange, total, responsive: true, pageSize }}
    scroll={{ x: true }}
    expandable={expandable}
  />
);
