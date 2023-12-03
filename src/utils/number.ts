export function formatCurrency(amount: number): string {
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);

  return formattedAmount;

  // Remove leading zero from decimal part if exists
  // return formattedAmount.replace(/\.0$/, '');
}
