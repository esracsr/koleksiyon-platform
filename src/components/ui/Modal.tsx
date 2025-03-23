import React from 'react';
import { FiX, FiAlertTriangle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

interface ModalProps {
  type: 'warning' | 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
}

const Modal: React.FC<ModalProps> = ({
  type,
  title,
  message,
  onClose,
  primaryButton,
  secondaryButton,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <FiAlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'success':
        return <FiCheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <FiAlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getButtonClass = (variant: string = 'primary') => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700';
      case 'warning':
        return 'bg-yellow-600 text-white hover:bg-yellow-700';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>
        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                {getIcon()}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {primaryButton && (
              <button
                type="button"
                className={`inline-flex w-full justify-center rounded-md px-4 py-2 text-base font-medium shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${getButtonClass(
                  primaryButton.variant
                )}`}
                onClick={primaryButton.onClick}
              >
                {primaryButton.label}
              </button>
            )}
            {secondaryButton && (
              <button
                type="button"
                className={`mt-3 inline-flex w-full justify-center rounded-md px-4 py-2 text-base font-medium shadow-sm sm:mt-0 sm:w-auto sm:text-sm ${getButtonClass(
                  'secondary'
                )}`}
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.label}
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 