/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { Button, Drawer, Typography, Tabs, Space, Alert, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Main } from '@/templates/Main';
import { Meta } from '@/layout/Meta';
import NylonForm from '@/components/Forms/nylon';
import { YTable } from '@/components/Table';
import { INylon } from '../api/_server/interfaces/nylon';
import { ColumnsType } from 'antd/es/table';
import { mockNylons } from '@/mocks/nylon';
import { Filter, FilterField, IBaseFilters } from '@/components/Filter';
import useSWR from 'swr';
import { INylonFilter } from '../api/_server/interfaces/filter';
import { ClientResponse } from '../api/_server/utils/constants';

interface INylonFilters extends IBaseFilters {
  name: string;
  quantity: number;
}

const NylonView = () => {
  const canFetch = false;
  const [show, setShow] = useState<{ show: boolean; nylon?: INylon }>({ show: false });
  const [filters, setFilters] = useState<INylonFilters>();
  const [pageNumber, setPageNumber] = useState(1);

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { isLoading, error } = useSWR<ClientResponse<INylon[]>>(
    canFetch
      ? `/api/nylon?pageNumber=${pageNumber}&pageSize=25&filters=${JSON.stringify({
          name: filters?.name,
          quantity: filters?.quantity,
        } as INylonFilter)}`
      : null,
    fetcher,
  );

  const filterFields: FilterField<INylonFilters>[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter nylon name',
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      placeholder: 'Quantity',
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, nylon) => `₦${nylon.price}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, nylon) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to edit?"
            okText="Edit"
            onConfirm={() => setShow({ show: true, nylon })}
            okButtonProps={{ type: 'dashed' }}
          >
            <Button icon={<EditOutlined />} />
          </Popconfirm>
          <Popconfirm
            title="Sure to delete?"
            okText="Delete"
            onConfirm={() => {}}
            okButtonProps={{ type: 'dashed', danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data =
    mockNylons?.map(n => ({
      key: n.id,
      name: n.name,
      price: n.price,
      quantity: n.quantity,
      type: n.type,
      manufacturer: n.manufacturer,
    })) || [];

  const nylonViews: TabsProps['items'] = [
    {
      key: '1',
      label: 'Main View',
      children: error ? (
        <Alert message="Error loading data" type="error" />
      ) : (
        <Space direction="vertical" className="w-full">
          <Filter<INylonFilters> filterFields={filterFields} onFilterChange={_filters => setFilters(_filters)} />
          <YTable
            data={data}
            columns={columns}
            total={2}
            onPaginationChange={page => setPageNumber(page)}
            loading={isLoading}
          />
        </Space>
      ),
    },
  ];

  return (
    <Main meta={<Meta title="Y-SURE" description="Nylon Manageement" />} className="p-2 md:p-4 lg:p-8">
      <div className="w-full">
        <Typography className="text-xl flex gap-4 items-center">
          Nylon Inventory
          <Button type="primary" onClick={() => setShow({ show: true })} icon={<PlusOutlined />}>
            Create
          </Button>
        </Typography>
        <Tabs defaultActiveKey="1" items={nylonViews} />

        <Drawer
          title={show?.nylon ? 'Edit Nylon' : 'Create Nylon'}
          placement="right"
          onClose={() => setShow({ show: false, nylon: undefined })}
          open={show.show}
        >
          <NylonForm nylonToEdit={show.nylon} />
        </Drawer>
      </div>
    </Main>
  );
};

export default NylonView;
