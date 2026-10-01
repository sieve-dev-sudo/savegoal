import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { CATEGORIES, CURRENCIES } from '../constants/categories';
import { CATEGORY_COLOR_CLASSES } from '../constants/categoryColors';

function GoalFormModal({ initialData, onSave, onClose }) {
  const isEditing = Boolean(initialData);

  const [name, setName] = useState(initialData?.name || '');
  const [targetAmount, setTargetAmount] = useState(
    initialData?.targetAmount ?? ''
  );
  const [deadline, setDeadline] = useState(initialData?.deadline || '');
  const [category, setCategory] = useState(
    initialData?.category || CATEGORIES[0].id
  );
  const [currency, setCurrency] = useState(initialData?.currency || 'USD');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'សូមបញ្ចូលឈ្មោះ Goal';
    }

    const amountNum = Number(targetAmount);
    if (!targetAmount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.targetAmount = 'ចំនួនគោលដៅត្រូវធំជាង 0';
    }

    if (deadline) {
      const today = new Date().toISOString().split('T')[0];
      if (deadline < today) {
        newErrors.deadline = 'Deadline មិនអាចនៅអតីតកាលទេ';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      name: name.trim(),
      targetAmount: Number(targetAmount),
      deadline: deadline || null,
      category,
      currency,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-5 shadow-xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {isEditing ? 'កែ Goal' : 'បង្កើត Goal ថ្មី'}
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

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="goal-name"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              ឈ្មោះ Goal
            </label>
            <input
              id="goal-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ឧ. ទិញទូរស័ព្ទថ្មី"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="goal-amount"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                ចំនួនគោលដៅ
              </label>
              <input
                id="goal-amount"
                type="number"
                min="0"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="500"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              />
              {errors.targetAmount && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.targetAmount}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="goal-currency"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                រូបិយប័ណ្ណ
              </label>
              <select
                id="goal-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              ប្រភេទ
            </span>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                const colors = CATEGORY_COLOR_CLASSES[c.color];
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`relative flex flex-col items-center gap-1 rounded-lg border p-2.5 text-xs transition-colors ${
                      active
                        ? `border-transparent ${colors.bg} ${colors.text} ring-2 ring-indigo-500`
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {active && (
                      <Check className="absolute right-1 top-1 h-3 w-3" />
                    )}
                    <Icon className={`h-4 w-4 ${active ? colors.icon : ''}`} />
                    <span className="text-center leading-tight">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="goal-deadline"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Deadline (ជម្រើស)
            </label>
            <input
              id="goal-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            />
            {errors.deadline && (
              <p className="mt-1 text-xs text-red-600">{errors.deadline}</p>
            )}
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
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {isEditing ? 'រក្សាទុក' : 'បង្កើត'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GoalFormModal;
