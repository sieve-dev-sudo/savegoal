/**
 * អត្រាប្តូររូបិយប័ណ្ណ (Exchange Rate)
 * 1 USD = 4,100 KHR (អាចកែបានតាមអត្រាទីផ្សារ)
 */
export const EXCHANGE_RATE_USD_TO_KHR = 4100;

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

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

/**
 * Format លេខធម្មតា (គ្មានសញ្ញារូបិយប័ណ្ណ)
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

/**
 * បម្លែង USD ទៅ KHR
 * ឧទាហរណ៍: convertUsdToKhr(500) → 2050000
 */
export function convertUsdToKhr(usdAmount) {
  const safeAmount = Number(usdAmount) || 0;
  return Math.round(safeAmount * EXCHANGE_RATE_USD_TO_KHR);
}

/**
 * បម្លែង KHR ទៅ USD
 * ឧទាហរណ៍: convertKhrToUsd(2050000) → 500
 */
export function convertKhrToUsd(khrAmount) {
  const safeAmount = Number(khrAmount) || 0;
  return Math.round((safeAmount / EXCHANGE_RATE_USD_TO_KHR) * 100) / 100;
}

/**
 * ត្រឡប់តម្លៃប្តូររូបិយប័ណ្ណទៅជា string ដែលបង្ហាញបាន
 * ឧទាហរណ៍: getConvertedDisplay(500, 'USD') → "≈ 2,050,000 ៛"
 */
export function getConvertedDisplay(amount, fromCurrency) {
  if (fromCurrency === 'USD') {
    const khr = convertUsdToKhr(amount);
    return `≈ ${formatCurrency(khr, 'KHR')}`;
  }
  const usd = convertKhrToUsd(amount);
  return `≈ ${formatCurrency(usd, 'USD')}`;
}

export const CURRENCY_SYMBOLS = {
  USD: '$',
  KHR: '៛',
};
