import { useState } from 'react';
import { X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { formatCurrency, CURRENCY_SYMBOLS } from '../utils/currency';

function DepositWithdrawModal({ goal, onDeposit, onWithdraw, onClose }) {
  const [mode, setMode] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const symbol = CURRENCY_SYMBOLS[goal.currency] || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountNum = Number(amount);

    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError('ចំនួនប្រាក់ត្រូវធំជាង 0');
      return;
    }

    if (mode === 'withdraw' && amountNum > goal.currentAmount) {
      setError('ចំនួនដកលើសពីទឹកប្រាក់ដែលមាន');
      return;
    }

    if (mode === 'deposit') {
      onDeposit(amountNum, note.trim());
    } else {
      onWithdraw(amountNum, note.trim());
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
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
          បច្ចុប្បន្ន: {formatCurrency(goal.currentAmount, goal.currency)} /{' '}
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
            បញ្ចូលប្រាក់
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
            ដកប្រាក់
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="tx-amount"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              ចំនួនទឹកប្រាក់ ({symbol})
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
          </div>

          <div>
            <label
              htmlFor="tx-note"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              កំណត់ចំណាំ (ជម្រើស)
            </label>
            <input
              id="tx-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="ឧ. ប្រាក់ខែខែនេះ"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              បោះបង់
            </button>
            <button
              type="submit"
              className={`rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 ${
                mode === 'deposit'
                  ? 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500'
                  : 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
              }`}
            >
              {mode === 'deposit' ? 'បញ្ចូលប្រាក់' : 'ដកប្រាក់'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepositWithdrawModal;
