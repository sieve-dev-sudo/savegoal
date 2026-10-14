import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, RotateCcw, Trash2 } from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/date';
import { getTrashDaysLeft, purgeExpired } from '../utils/trash';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import GoalThumbnail from '../components/GoalThumbnail';

function daysLeftClass(days) {
  if (days <= 3) {
    return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
  }
  if (days <= 7) {
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
  }
  return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
}

function TrashPage() {
  const { trash, restoreGoal, deleteForever, emptyTrash } = useGoals();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [foreverItem, setForeverItem] = useState(null);
  const [confirmEmpty, setConfirmEmpty] = useState(false);

  // បង្ហាញតែ item ដែលមិនទាន់ហួសកំណត់ ថ្មីបំផុតនៅលើគេ
  const items = useMemo(
    () =>
      purgeExpired(trash).sort(
        (a, b) => new Date(b.deletedAt) - new Date(a.deletedAt)
      ),
    [trash]
  );

  const handleRestore = (item) => {
    restoreGoal(item.id);
    showToast(t.toast.goalRestored, 'success');
  };

  const handleDeleteForever = () => {
    deleteForever(foreverItem.id);
    showToast(t.toast.goalDeletedForever, 'success');
    setForeverItem(null);
  };

  const handleEmptyTrash = () => {
    emptyTrash();
    showToast(t.toast.trashEmptied, 'success');
    setConfirmEmpty(false);
  };

  return (
    <section>
      <div className="flex items-start justify-between gap-3 rounded-xl bg-slate-200 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{t.trash.retentionNote}</p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => setConfirmEmpty(true)}
            className="shrink-0 rounded-lg px-2 py-1 font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            {t.trash.emptyAction}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon={Trash2}
            title={t.trash.emptyTitle}
            description={t.trash.emptyDescription}
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const daysLeft = getTrashDaysLeft(item.deletedAt);
              return (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="opacity-60">
                      <GoalThumbnail size={56} image={item.image} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-lg font-medium text-slate-900 dark:text-slate-100">
                          {item.name}
                        </p>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${daysLeftClass(daysLeft)}`}
                        >
                          {t.trash.daysLeft(daysLeft)}
                        </span>
                      </div>

                      <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                        {t.trash.saved}:{' '}
                        {formatCurrency(item.currentAmount, item.currency)} /{' '}
                        {formatCurrency(item.targetAmount, item.currency)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t.trash.deletedOn}: {formatDate(item.deletedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleRestore(item)}
                      className="flex items-center justify-center gap-1.5 rounded-full bg-cyan-800 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 dark:bg-cyan-700 dark:hover:bg-cyan-600"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t.trash.restore}
                    </button>
                    <button
                      type="button"
                      onClick={() => setForeverItem(item)}
                      className="flex items-center justify-center gap-1.5 rounded-full border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      {t.trash.deleteForever}
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      <AnimatePresence>
        {foreverItem && (
          <ConfirmDialog
            title={t.confirm.foreverTitle}
            message={t.confirm.foreverMessage(foreverItem.name)}
            confirmLabel={t.confirm.deleteForever}
            onConfirm={handleDeleteForever}
            onCancel={() => setForeverItem(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmEmpty && (
          <ConfirmDialog
            title={t.confirm.emptyTitle}
            message={t.confirm.emptyMessage(items.length)}
            confirmLabel={t.confirm.emptyConfirm}
            onConfirm={handleEmptyTrash}
            onCancel={() => setConfirmEmpty(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default TrashPage;
