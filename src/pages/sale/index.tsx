/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import useSWR from 'swr';
import { Alert, Button, Drawer, Flex, Popconfirm, Space, Tabs, TabsProps, Tag, Typography } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Main } from '@/templates/Main';
import { Meta } from '@/layout/Meta';
import { ColumnsType } from 'antd/es/table';
import SaleForm from '@/components/Forms/sale';
import { YTable } from '@/components/Table';
import { INylon } from '../api/_server/interfaces/nylon';
import { Filter, FilterField, IBaseFilters } from '@/components/Filter';
import { mockNylons } from '@/mocks/nylon';
import { mockSales } from '@/mocks/sale';
import { ISaleFilter } from '../api/_server/interfaces/filter';
import { ClientResponse } from '../api/_server/utils/constants';
import { SaleDto } from '../api/_server/dtos/sale';
import { TimeFrameType } from '../api/_server/enums/TimeFrameEnum';

interface ISalesFilters extends IBaseFilters {
  nylons?: INylon[];
  timeFrame?: TimeFrameType;
}

const SaleView = () => {
  const canFetch = false;
  const [show, setShow] = useState<{ show: boolean; sale?: SaleDto }>({ show: false });
  const [filters, setFilters] = useState<ISalesFilters>();
  const [pageNumber, setPageNumber] = useState(1);

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { isLoading, error } = useSWR<ClientResponse<SaleDto[]>>(
    canFetch
      ? `/api/sale?pageNumber=${pageNumber}&pageSize=25&filters=${JSON.stringify({
          nylons: filters?.nylons,
          timeFrame: filters?.timeFrame,
        } as ISaleFilter)}`
      : null,
    fetcher,
  );

  const filterFields: FilterField<ISalesFilters>[] = [
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
      title: 'Nylon Types sold',
      dataIndex: 'nylonsSold',
      key: 'nylonsSold',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (_, sale) => `₦${sale.totalAmount}`,
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      render: (_, sale) => `₦${sale.amountPaid}`,
    },
    {
      title: 'Amount Owed',
      dataIndex: 'amountOwed',
      key: 'amountOwed',
      render: (_, sale) => `₦${sale.amountOwed}`,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Date Sold',
      dataIndex: 'dateSold',
      key: 'dateSold',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, sale) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to edit?"
            okText="Edit"
            onConfirm={() => setShow({ show: true, sale })}
            okButtonProps={{ type: 'dashed' }}
          >
            <Button icon={<EditOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data =
    mockSales?.map(n => ({
      key: n.id,
      nylons: n.nylons,
      totalAmount: n.totalAmount,
      amountPaid: n.amountPaid,
      amountOwed: n.amountOwed,
      nylonsSold: n.nylons?.length,
      dateSold: n.createdAt.toDateString(),
      comment: n.comment,
    })) || [];

  const saleViews: TabsProps['items'] = [
    {
      key: '1',
      label: 'Main View',
      children: error ? (
        <Alert message="Error loading data" type="error" />
      ) : (
        <Space direction="vertical" className="w-full">
          <Filter<ISalesFilters> filterFields={filterFields} onFilterChange={_filters => setFilters(_filters)} />
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
              // defaultExpandAllRows: true,
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Main meta={<Meta title="Y-SURE" description="Nylon Manageement" />} className="p-2 md:p-4 lg:p-8">
      <div className="w-full">
        <Typography className="text-xl flex gap-4 items-center">
          Sales
          <Button type="primary" onClick={() => setShow({ show: true })} icon={<PlusOutlined />}>
            Register
          </Button>
        </Typography>
        <Tabs defaultActiveKey="1" items={saleViews} />

        <Drawer
          title={show?.sale ? 'Edit Sale' : 'Register Sale'}
          placement="right"
          onClose={() => setShow({ show: false, sale: undefined })}
          open={show.show}
        >
          <SaleForm saleToEdit={show.sale} />
        </Drawer>
      </div>
    </Main>
  );
};

export default SaleView;
