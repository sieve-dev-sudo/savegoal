import { Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useLanguage } from '../context/LanguageContext';

function OverallProgressCard({ totals }) {
  const { t } = useLanguage();

  return (
    <section className="rounded-2xl bg-slate-800 p-5 text-white shadow-sm">
      <div className="flex items-center gap-2 text-amber-400">
        <Wallet className="h-5 w-5" />
        <h2 className="text-base font-medium">{t.dashboard.overview}</h2>
      </div>

      <div className="mt-4 space-y-5">
        {totals.map((item, index) => (
          <div
            key={item.currency}
            className={index > 0 ? 'border-t border-slate-700 pt-5' : ''}
          >
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {t.dashboard.saved}
                </p>
                <p className="text-3xl font-medium">
                  {formatCurrency(item.current, item.currency)}
                </p>
              </div>
              <span className="rounded bg-lime-600 px-2.5 py-1 text-sm font-semibold">
                {item.percent} %
              </span>
            </div>

            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-lime-500 transition-[width] duration-500 ease-out"
                style={{ width: `${item.percent}%` }}
                role="progressbar"
                aria-valuenow={item.percent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>

            <div className="mt-3 grid grid-cols-2 text-sm">
              <div>
                <p className="text-slate-400">{t.dashboard.target}</p>
                <p>{formatCurrency(item.target, item.currency)}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400">{t.dashboard.remaining}</p>
                <p>{formatCurrency(item.remaining, item.currency)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OverallProgressCard;
