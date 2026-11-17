export const formatMoney = (value: number) =>
  new Intl.NumberFormat('fa-IR', {
    maximumFractionDigits: 0
  }).format(value)

export const formatNumber = (value: number) => new Intl.NumberFormat('fa-IR').format(value)

export const formatPercent = (value: number) => `${formatNumber(value)}٪`
