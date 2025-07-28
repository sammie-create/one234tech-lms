import { useEscapeKey } from "@/hooks/useEscapeKey";

function ConfirmationModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmClass = "bg-blue-600",
}) {
  useEscapeKey(isOpen, onCancel);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onCancel}
    >
      <div
        className="w-[85%] max-w-sm rounded bg-white p-4 shadow outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h3 id="modal-title" className="mb-2 text-lg font-semibold">
          {title}
        </h3>
        <p className="mb-4 text-gray-600 md:text-xs">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="text-gray-600 hover:underline md:text-xs"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`cursor-pointer rounded px-3 py-1 text-white md:text-xs ${confirmClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
