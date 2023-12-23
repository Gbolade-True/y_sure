/* eslint-disable import/no-extraneous-dependencies */
import { ColorMode } from '@/contexts/Theme';

export const formatAmount = (amount: number | undefined | null) => {
  if (!amount) return '₦0';

  const am = amount.toString();
  const toNumber = parseFloat(am.replace(/\D/g, ''));
  const toLocale = '₦' + toNumber.toLocaleString();
  return toLocale;
};

export const downloadPdf = async (page: HTMLElement | null, outputName: string, colorMode?: ColorMode) => {
  if (!page) return;
  const html2PDF = (await import('jspdf-html2canvas')).default;
  html2PDF(page, {
    jsPDF: {
      format: 'a4',
      unit: 'px',
    },
    html2canvas: {
      useCORS: false,
      scrollX: 0,
      scrollY: -window.scrollY,
      backgroundColor: colorMode === 'light' ? '#fff' : '#062341',
      logging: true,
      scale: 10,
    },
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    imageType: 'image/jpeg',
    imageQuality: 1,
    output: outputName,
  });
};
