import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
};

const COLORS = {
  success: 'bg-green-600',
  error: 'bg-red-600',
};

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || CheckCircle2;
          const color = COLORS[toast.type] || COLORS.success;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-white shadow-lg ${color}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{toast.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
