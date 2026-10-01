/**
 * Format លេខតាមរូបិយប័ណ្ណ
 * USD: $500.00
 * KHR: 2.000 ៛  (KHR មិនប្រើ decimal ទេ តាមការអនុវត្តជាក់ស្តែង)
 */
export function formatCurrency(amount, currency = 'USD') {
  const safeAmount = Number(amount) || 0;

  if (currency === 'KHR') {
    const rounded = Math.round(safeAmount);
    const formatted = new Intl.NumberFormat('km-KH').format(rounded);
    return `${formatted} ៛`;
  }

  // Default: USD
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

/**
 * Format លេខធម្មតា (គ្មានសញ្ញារូបិយប័ណ្ណ) សម្រាប់ប្រើក្នុង input ឬកន្លែងផ្សេង
 */
export function formatNumber(amount, currency = 'USD') {
  const safeAmount = Number(amount) || 0;

  if (currency === 'KHR') {
    return new Intl.NumberFormat('km-KH').format(Math.round(safeAmount));
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

export const CURRENCY_SYMBOLS = {
  USD: '$',
  KHR: '៛',
};
