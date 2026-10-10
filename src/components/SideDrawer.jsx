import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Target,
  LayoutDashboard,
  Download,
  Upload,
  Languages,
} from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { exportGoalsToFile, parseBackupFile } from '../utils/backup';
import LanguageToggle from './LanguageToggle';

function DrawerItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 px-6 py-3.5 text-left text-base ${
        active
          ? 'bg-slate-200 font-medium text-slate-900 dark:bg-slate-700 dark:text-slate-100'
          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
      }`}
    >
      <Icon className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
      <span>{label}</span>
    </button>
  );
}

function SideDrawer({ currentPage, onNavigate, onClose }) {
  const { goals, setGoals } = useGoals();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  const go = (page) => {
    onNavigate(page);
    onClose();
  };

  const handleExport = () => {
    exportGoalsToFile(goals);
    showToast(t.drawer.exportDone, 'success');
    onClose();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    try {
      const text = await file.text();
      const imported = parseBackupFile(text);
      if (!window.confirm(t.drawer.importConfirm)) return;
      setGoals(imported);
      showToast(t.drawer.importDone(imported.length), 'success');
      onClose();
    } catch {
      showToast(t.drawer.importError, 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-40 bg-black/50"
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto rounded-r-3xl bg-slate-100 shadow-xl dark:bg-slate-900"
      >
        <div className="relative bg-slate-800 px-8 pb-8 pt-10 text-center">
          <button
            type="button"
            onClick={onClose}
            aria-label={t.drawer.close}
            className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-300 hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>

          <span
            className="absolute left-6 top-8 font-serif text-5xl leading-none text-amber-400"
            aria-hidden="true"
          >
            “
          </span>
          <p className="font-serif text-lg leading-snug text-slate-100">
            {t.drawer.quoteLine1}
            <br />
            {t.drawer.quoteLine2}
          </p>
          <p className="mt-4 font-serif text-lg leading-snug text-slate-100">
            {t.drawer.quoteLine3}
            <br />
            {t.drawer.quoteLine4}
          </p>
          <span
            className="absolute bottom-3 right-6 font-serif text-5xl leading-none text-amber-400"
            aria-hidden="true"
          >
            ”
          </span>
        </div>

        <nav className="flex-1 py-2" aria-label="Drawer menu">
          <DrawerItem
            icon={Target}
            label={t.drawer.dashboard}
            active={currentPage === 'goals'}
            onClick={() => go('goals')}
          />
          <DrawerItem
            icon={LayoutDashboard}
            label={t.drawer.statistics}
            active={currentPage === 'statistics'}
            onClick={() => go('statistics')}
          />

          <div className="mx-6 my-2 border-t border-slate-300 dark:border-slate-700" />

          <DrawerItem
            icon={Download}
            label={t.drawer.exportBackup}
            onClick={handleExport}
          />
          <DrawerItem
            icon={Upload}
            label={t.drawer.importBackup}
            onClick={() => fileInputRef.current?.click()}
          />

          <div className="mx-6 my-2 border-t border-slate-300 dark:border-slate-700" />

          <div className="flex items-center justify-between gap-4 px-6 py-3">
            <div className="flex items-center gap-4 text-base text-slate-700 dark:text-slate-200">
              <Languages className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
              <span>{t.drawer.language}</span>
            </div>
            <LanguageToggle />
          </div>
        </nav>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFileChange}
          className="hidden"
        />
      </motion.aside>
    </motion.div>
  );
}

export default SideDrawer;
