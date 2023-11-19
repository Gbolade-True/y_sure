import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { Card, Flex, Typography, Calendar } from 'antd';

const Index = () => {
  return (
    <Main meta={<Meta title="Sparkles NFT" description="Sparkles NFT marketplace" />}>
      <main className="flex flex-col p-4 md:p-8">
        <div>
          <Flex gap="middle" wrap="wrap" className="my-8">
            <Card title="Sale Metrics" extra={<a href="#">More</a>} className="w-full sm:w-80">
              <Typography>Card content</Typography>
              <Typography>Card content</Typography>
              <Typography>Card content</Typography>
            </Card>
            <Card title="Nylon Inventory" extra={<a href="#">More</a>} className="w-full sm:w-80">
              <Typography>Card content</Typography>
              <Typography>Card content</Typography>
              <Typography>Card content</Typography>
            </Card>
            <Card title="Recent Purchases" extra={<a href="#">More</a>} className="w-full sm:w-80">
              <Typography>Card content</Typography>
              <Typography>Card content</Typography>
              <Typography>Card content</Typography>
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
