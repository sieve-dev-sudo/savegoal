import { ArrowRightLeft } from 'lucide-react';
import { getConvertedDisplay } from '../utils/currency';

function CurrencyConversionHint({ amount, currency }) {
  if (!amount || Number(amount) <= 0) return null;

  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
      <ArrowRightLeft className="h-3 w-3" />
      {getConvertedDisplay(amount, currency)}
    </p>
  );
}

export default CurrencyConversionHint;
