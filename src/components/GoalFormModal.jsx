import { useState } from 'react';
import { CATEGORIES, CURRENCIES } from '../constants/categories';
import { CURRENCY_SYMBOLS } from '../utils/currency';
import { useLanguage } from '../context/LanguageContext';
import { useGoals } from '../context/GoalContext';
import { useToast } from '../context/ToastContext';
import ModalOverlay from './ModalOverlay';
import ConfirmDialog from './ConfirmDialog';
import GoalThumbnail from './GoalThumbnail';
import OutlinedField from './OutlinedField';
import CurrencyConversionHint from './CurrencyConversionHint';

function GoalFormModal({ initialData, onSave, onClose }) {
  const { t, isEnglish } = useLanguage();
  const { deleteGoal } = useGoals();
  const { showToast } = useToast();
  const isEditing = Boolean(initialData);

  const [name, setName] = useState(initialData?.name || '');
  const [targetAmount, setTargetAmount] = useState(
    initialData?.targetAmount ?? ''
  );
  const [note, setNote] = useState(initialData?.note || '');
  const [deadline, setDeadline] = useState(initialData?.deadline || '');
  const [category, setCategory] = useState(
    initialData?.category || CATEGORIES[0].id
  );
  const [currency, setCurrency] = useState(initialData?.currency || 'USD');
  const [errors, setErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t.goalForm.errors.name;
    }

    const amountNum = Number(targetAmount);
    if (!targetAmount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.targetAmount = t.goalForm.errors.amount;
    }

    if (deadline) {
      const today = new Date().toISOString().split('T')[0];
      if (deadline < today) {
        newErrors.deadline = t.goalForm.errors.deadline;
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
      note: note.trim(),
      deadline: deadline || null,
      category,
      currency,
    });
  };

  const handleDelete = () => {
    deleteGoal(initialData.id);
    showToast(t.toast.goalDeleted, 'success');
    onClose();
  };

  return (
    <>
      <ModalOverlay onClose={onClose} maxWidthClass="max-w-md">
        <h3 className="text-center text-xl font-medium text-slate-900 dark:text-slate-100">
          {isEditing ? t.goalForm.titleEdit : t.goalForm.titleCreate}
        </h3>

        <form onSubmit={handleSubmit} noValidate>
          <div className="-mx-1 mt-3 max-h-[70vh] space-y-4 overflow-y-auto px-1 pb-1 pt-3">
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {t.goalForm.imageLabel}
              </span>
              <GoalThumbnail size={56} />
            </div>

            <OutlinedField
              id="goal-name"
              label={t.goalForm.name}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />

            <div>
              <OutlinedField
                id="goal-amount"
                label={t.goalForm.targetAmount}
                type="number"
                min="0"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                error={errors.targetAmount}
              />
              <CurrencyConversionHint
                amount={targetAmount}
                currency={currency}
              />
            </div>

            <OutlinedField
              id="goal-note"
              label={t.goalForm.note}
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <OutlinedField
              id="goal-deadline"
              label={t.goalForm.deadline}
              type="date"
              alwaysFloat
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              error={errors.deadline}
            />

            <OutlinedField
              id="goal-category"
              label={t.goalForm.category}
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {isEnglish ? c.labelEn : c.label}
                </option>
              ))}
            </OutlinedField>

            <div className="flex items-center justify-between gap-3 rounded-md border border-slate-400 px-4 py-2 dark:border-slate-500">
              <span className="text-base text-slate-700 dark:text-slate-200">
                {t.goalForm.currency}
              </span>
              <div className="flex gap-1.5">
                {CURRENCIES.map((c) => {
                  const active = currency === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`rounded-md border px-4 py-2 text-sm font-medium ${
                        active
                          ? 'border-slate-400 bg-slate-200 text-cyan-800 dark:border-slate-500 dark:bg-slate-700 dark:text-cyan-300'
                          : 'border-transparent text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                      }`}
                    >
                      {CURRENCY_SYMBOLS[c]} {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-cyan-800 px-4 py-3 text-base font-medium text-cyan-800 hover:bg-cyan-50 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-slate-700"
            >
              {t.goalForm.cancel}
            </button>
            <button
              type="submit"
              className="rounded-full bg-cyan-800 px-4 py-3 text-base font-medium text-white hover:bg-cyan-900 dark:bg-cyan-700 dark:hover:bg-cyan-600"
            >
              {t.goalForm.done}
            </button>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="mt-3 w-full rounded-lg py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              {t.goalForm.deleteGoal}
            </button>
          )}
        </form>
      </ModalOverlay>

      {confirmDelete && (
        <ConfirmDialog
          title={t.confirm.deleteTitle}
          message={t.confirm.deleteMessage(initialData.name)}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}

export default GoalFormModal;
