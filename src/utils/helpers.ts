export const formatAmount = (amount: number | undefined | null) => {
  if (!amount) return '₦0';

  const am = amount.toString();
  const toNumber = parseFloat(am.replace(/\D/g, ''));
  const toLocale = '₦' + toNumber.toLocaleString();
  return toLocale;
};
