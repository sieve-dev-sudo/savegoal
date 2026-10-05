import { useState } from 'react';
import { X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { formatCurrency, CURRENCY_SYMBOLS } from '../utils/currency';
import { useLanguage } from '../context/LanguageContext';
import ModalOverlay from './ModalOverlay';
import CurrencyConversionHint from './CurrencyConversionHint';

function DepositWithdrawModal({ goal, onDeposit, onWithdraw, onClose }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const symbol = CURRENCY_SYMBOLS[goal.currency] || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountNum = Number(amount);

    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError(t.transaction.errorAmount);
      return;
    }

    if (mode === 'withdraw' && amountNum > goal.currentAmount) {
      setError(t.transaction.errorInsufficient);
      return;
    }

    if (mode === 'deposit') {
      onDeposit(amountNum, note.trim());
    } else {
      onWithdraw(amountNum, note.trim());
    }
  };

  return (
    <ModalOverlay onClose={onClose} maxWidthClass="max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {goal.name}
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {t.transaction.current}: {formatCurrency(goal.currentAmount, goal.currency)} /{' '}
        {formatCurrency(goal.targetAmount, goal.currency)}
      </p>

      <div className="mb-4 flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
        <button
          type="button"
          onClick={() => {
            setMode('deposit');
            setError('');
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors ${
            mode === 'deposit'
              ? 'bg-white text-green-600 shadow-sm dark:bg-slate-800 dark:text-green-400'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <ArrowDownCircle className="h-4 w-4" />
          {t.transaction.deposit}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('withdraw');
            setError('');
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors ${
            mode === 'withdraw'
              ? 'bg-white text-red-600 shadow-sm dark:bg-slate-800 dark:text-red-400'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <ArrowUpCircle className="h-4 w-4" />
          {t.transaction.withdraw}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label
            htmlFor="tx-amount"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t.transaction.amount} ({symbol})
          </label>
          <input
            id="tx-amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            placeholder="50"
            autoFocus
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          <CurrencyConversionHint amount={amount} currency={goal.currency} />
        </div>

        <div>
          <label
            htmlFor="tx-note"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t.transaction.note}
          </label>
          <input
            id="tx-note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t.transaction.notePlaceholder}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {t.goalForm.cancel}
          </button>
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 ${
              mode === 'deposit'
                ? 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500'
                : 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
            }`}
          >
            {mode === 'deposit' ? t.transaction.deposit : t.transaction.withdraw}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
}

export default DepositWithdrawModal;
