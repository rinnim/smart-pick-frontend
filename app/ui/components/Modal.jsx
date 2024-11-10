import CloseButton from "./CloseButton";
import TextButton from "./TextButton";
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText = "Confirm",
  confirmClassName,
  cancelText = "Cancel",
  cancelClassName,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6">
        <CloseButton onClose={onClose} />
        <h3 className="text-center text-xl font-bold">{title}</h3>
        {/* Modal Content */}
        <div className="py-5">{children}</div>
        <div className="flex justify-center space-x-4">
          <TextButton
            className={cancelClassName}
            text={cancelText}
            onClick={onClose}
          />
          <TextButton
            className={confirmClassName}
            text={confirmText}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
