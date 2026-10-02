import ModalOverlay from './ModalOverlay';

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <ModalOverlay onClose={onCancel} maxWidthClass="max-w-sm">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {message}
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          បោះបង់
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          លុប
        </button>
      </div>
    </ModalOverlay>
  );
}

export default ConfirmDialog;
