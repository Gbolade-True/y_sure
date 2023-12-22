/* eslint-disable import/no-extraneous-dependencies */
// import useSWR from 'swr';
import Link from 'next/link';
import { Card, Flex, Typography, Calendar, MenuProps, Menu } from 'antd';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { formatAmount } from '@/utils/helpers';
import { useState } from 'react';
import { TimeFrameType } from './api/_server/enums/TimeFrameEnum';
// import { ClientResponse } from './api/_server/utils/constants';
// import { CheckSalesTotalDto } from './api/_server/dtos/sale';
// import { TimeFrameEnum } from './api/_server/enums/TimeFrameEnum';
// import { IPurchaseFilter, ISaleFilter } from './api/_server/interfaces/filter';
// import { formatAmount } from '@/utils/helpers';
// import { CheckPurchaseTotalDto } from './api/_server/dtos/purchase';

const Index = () => {
  // const fetcher = (url: string) => fetch(url).then(res => res.json());
  // const { data: saleData, isLoading: saleLoading } = useSWR<ClientResponse<CheckSalesTotalDto>>(
  //   `/api/sale/check_total?filters=${JSON.stringify({
  //     timeFrame: TimeFrameEnum.MONTH,
  //   } as ISaleFilter)}`,
  //   fetcher,
  // );

  // const { data: purchaseData, isLoading: purchaseLoading } = useSWR<ClientResponse<CheckPurchaseTotalDto>>(
  //   `/api/purchase/check_total?filters=${JSON.stringify({
  //     timeFrame: TimeFrameEnum.MONTH,
  //   } as IPurchaseFilter)}`,
  //   fetcher,
  // );

  type YSureScope = 'sale' | 'purchase';
  type ScopeTimeFrameType = {
    [K in YSureScope]: TimeFrameType;
  };
  const [scopeTimeFrame, setScopeTimeFrame] = useState<ScopeTimeFrameType>({
    sale: 'month',
    purchase: 'month',
  });

  const timeFrameItems = (scope: YSureScope): MenuProps['items'] => [
    {
      label: '',
      key: 'timeFrameOptions',
      children: [
        {
          key: 'day',
          label: 'Day',
          onClick: () => setScopeTimeFrame(prev => ({ ...prev, [scope]: 'day' })),
        },
        {
          key: 'week',
          label: 'Week',
          onClick: () => setScopeTimeFrame(prev => ({ ...prev, [scope]: 'week' })),
        },
        {
          key: 'month',
          label: 'Month',
          onClick: () => setScopeTimeFrame(prev => ({ ...prev, [scope]: 'month' })),
        },
      ],
    },
  ];

  const displayTimeFrame = (timeFrame: TimeFrameType) => {
    if (timeFrame === 'day') return 'Day';
    if (timeFrame === 'week') return 'Week';
    if (timeFrame === 'month') return 'Month';
  };

  return (
    <Main meta={<Meta title="Y-Sure" description="Y-Sure" />}>
      <main className="flex flex-col p-4 md:p-8">
        <div>
          <Flex gap="middle" wrap="wrap" className="my-8">
            <Card
              loading={false}
              title="Sale Metrics"
              extra={
                <div className="flex items-center gap-2">
                  <Menu items={timeFrameItems('sale')} />
                  <Link href="/sale">More</Link>
                </div>
              }
              className="w-full sm:w-80"
            >
              <Typography className="text-lg">
                This {displayTimeFrame(scopeTimeFrame.sale)}: {formatAmount(4000)}
              </Typography>
            </Card>
            <Card
              loading={false}
              title="Recent Purchases"
              extra={
                <div className="flex items-center gap-2">
                  <Menu items={timeFrameItems('purchase')} />
                  <Link href="/purchase">More</Link>
                </div>
              }
              className="w-full sm:w-80"
            >
              <Typography className="text-lg">
                This {displayTimeFrame(scopeTimeFrame.purchase)}: {formatAmount(2000)}
              </Typography>
            </Card>
            <Card title="Nylon Inventory" extra={<Link href="/nylon">More</Link>} className="w-full sm:w-80">
              <Typography>Click More to see full nylon inventory</Typography>
            </Card>
          </Flex>
          <Typography className="h6">View Calendar</Typography>
          <Calendar fullscreen={false} />
        </div>
      </main>
    </Main>
  );
};

export default Index;
