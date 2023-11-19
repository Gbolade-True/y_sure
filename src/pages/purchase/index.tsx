/* eslint-disable import/no-extraneous-dependencies */
import { Alert, Button, Drawer, Flex, Space, Tabs, TabsProps, Tag, Typography } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Main } from '@/templates/Main';
import { Meta } from '@/layout/Meta';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import PurchaseForm from '@/components/Forms/purchase';
import { YTable } from '@/components/Table';
import { INylon } from '../api/_server/interfaces/nylon';
import { IPurchase } from '../api/_server/interfaces/purchase';
import { mockPurchases } from '@/mocks/purchase';
import { Filter, FilterField, IBaseFilters } from '@/components/Filter';
import { IPurchaseFilter, TimeFrameType } from '../api/_server/interfaces/filter';
import useSWR from 'swr';
import { mockNylons } from '@/mocks/nylon';
import { ClientResponse } from '../api/_server/utils/constants';

interface IPurchaseFilters extends IBaseFilters {
  nylons?: INylon[];
  timeFrame?: TimeFrameType;
}

const PurchaseView = () => {
  const canFetch = false;
  const [show, setShow] = useState<{ show: boolean; purchase?: IPurchase }>({ show: false });
  const [filters, setFilters] = useState<IPurchaseFilters>();
  const [pageNumber, setPageNumber] = useState(1);

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { isLoading, error } = useSWR<ClientResponse<IPurchase[]>>(
    canFetch
      ? `/api/purchase?pageNumber=${pageNumber}&pageSize=25&filters=${JSON.stringify({
          nylons: filters?.nylons,
          timeFrame: filters?.timeFrame,
        } as IPurchaseFilter)}`
      : null,
    fetcher,
  );

  const filterFields: FilterField<IPurchaseFilters>[] = [
    {
      name: 'nylons',
      label: 'Nylons',
      type: 'tag',
      placeholder: 'Select Nylons',
      options: mockNylons.map(n => ({ value: n.name, label: n.name })),
    },
    {
      name: 'timeFrame',
      label: 'Time Frame',
      type: 'select',
      options: ['day', 'week', 'month', 'year'].map(t => ({ value: t, label: t })),
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'Nylon Types Bought',
      dataIndex: 'nylonsBought',
      key: 'nylonsBought',
    },
    {
      title: 'Amount Paid',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (_, purchase) => `₦${purchase.totalAmount}`,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Date Purchased',
      dataIndex: 'datePurchased',
      key: 'datePurchased',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, purchase) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => setShow({ show: true, purchase })} />
        </Space>
      ),
    },
  ];

  const data =
    mockPurchases?.map(p => ({
      key: p.id,
      nylons: p.nylons,
      nylonsBought: p.nylons?.length,
      datePurchased: p.datePurchased,
      comment: p.comment,
      totalAmount: p.totalAmount,
    })) || [];

  const purchaseViews: TabsProps['items'] = [
    {
      key: '1',
      label: 'Main View',
      children: error ? (
        <Alert message="Error loading data" type="error" />
      ) : (
        <Space direction="vertical" className="w-full">
          <Filter<IPurchaseFilters> filterFields={filterFields} onFilterChange={_filters => setFilters(_filters)} />
          <YTable
            data={data}
            columns={columns}
            total={2}
            onPaginationChange={page => setPageNumber(page)}
            loading={isLoading}
            expandable={{
              expandedRowRender: record => (
                <Flex wrap="wrap" className="sm:ml-8" gap={4}>
                  {(record.nylons as INylon[])?.map(n => <Tag key={n?.id}>{`${n?.name} - ${n?.quantity}`}</Tag>)}
                </Flex>
              ),
              rowExpandable: () => true,
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Main meta={<Meta title="Y-SURE" description="Nylon Manageement" />} className="p-2 md:p-4 lg:p-8">
      <div className="w-full">
        <Typography className="text-xl flex gap-1">
          Purchase Management
          <Button type="link" onClick={() => setShow({ show: true })} icon={<PlusOutlined />}>
            Create
          </Button>
        </Typography>
        <Tabs defaultActiveKey="1" items={purchaseViews} />

        <Drawer
          title={show?.purchase ? 'Edit Purchase' : 'Create Purchase'}
          placement="right"
          onClose={() => setShow({ show: false, purchase: undefined })}
          open={show.show}
        >
          <PurchaseForm purchaseToEdit={show.purchase} />
        </Drawer>
      </div>
    </Main>
  );
};

export default PurchaseView;
