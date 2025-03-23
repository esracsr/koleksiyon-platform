import { useEffect } from 'react';
import { FiX, FiAlertOctagon, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  type: 'warning' | 'success' | 'error';
  title: string;
  message: string;
  primaryButton?: {
    label: string;
    onClick: () => void;
    variant?: 'success' | 'danger' | 'warning';
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
}

export default function Modal({ 
  onClose, 
  type, 
  title, 
  message, 
  primaryButton, 
  secondaryButton 
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <FiAlertOctagon className="w-12 h-12 text-red-600" />;
      case 'success':
        return <FiCheckCircle className="w-12 h-12 text-emerald-500" />;
      case 'error':
        return <FiAlertTriangle className="w-12 h-12 text-yellow-500" />;
    }
  };

  const getPrimaryButtonStyle = () => {
    switch (primaryButton?.variant) {
      case 'success':
        return 'bg-emerald-500 hover:bg-emerald-600 text-white';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl w-[400px] mx-4">
        <div className="p-6 flex flex-col items-center text-center">
          {getIcon()}
          <h2 className="text-2xl font-bold mt-4 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex gap-3 w-full">
            {secondaryButton && (
              <button
                onClick={secondaryButton.onClick}
                className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {secondaryButton.label}
              </button>
            )}
            {primaryButton && (
              <button
                onClick={primaryButton.onClick}
                className={`flex-1 px-6 py-3 rounded-lg ${getPrimaryButtonStyle()}`}
              >
                {primaryButton.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 