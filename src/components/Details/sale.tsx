/* eslint-disable import/no-extraneous-dependencies */
import { ISaleRow } from '@/pages/sale';
import { downloadPdf, formatAmount } from '@/utils/helpers';
import { Button, Divider, Typography } from 'antd';
import { useRef } from 'react';

export const SaleDetails = ({ sale }: { sale: ISaleRow | null }) => {
  const saleReceiptRef = useRef<HTMLDivElement>(null);
  if (!sale) return <Typography>No Sale Selected </Typography>;

  return (
    <div className="relative">
      <Button
        type="dashed"
        className="absolute right-0 top-0"
        onClick={() => downloadPdf(saleReceiptRef?.current, 'receipt.pdf', 'light')}
      >
        Generate Receipt
      </Button>
      <div ref={saleReceiptRef}>
        <Typography className="text-xl">Receipt:</Typography>
        <Typography className="text-sm">Thank you for shopping with Y-Sure!</Typography>
        <Divider className="my-8" />
        <Typography className="text-lg">Nylons Bought:</Typography>
        {sale.nylons.map(nylon => {
          return (
            <Typography key={nylon.id}>
              {nylon.name} - {nylon.quantity}
            </Typography>
          );
        })}
        <Divider className="mt-8 mb-2" />
        <Typography className="font-bold text-base">
          Total - {formatAmount(sale.nylons.reduce((sum, item) => sum + item.quantity * item.price, 0))}
        </Typography>
        <Divider className="my-2" />
        <Typography className="text-base">Amount Paid - {formatAmount(sale.amountPaid)}</Typography>
        <Divider className="my-2" />
        <Typography>Date: {sale.dateSold}</Typography>
      </div>
    </div>
  );
};
