import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      <div className="relative bg-lol-secondary border-2 border-lol-accent rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-lol-secondary border-b border-lol-accent/30 p-4 flex justify-between items-center">
          {title && <h2 className="text-2xl font-bold text-lol-gold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-lol-gold hover:text-white text-2xl font-bold ml-auto"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
