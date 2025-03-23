import React from 'react';
import { FiX } from 'react-icons/fi';

interface ConfirmationModalProps {
  isOpen: boolean;
  type: 'confirm' | 'success' | 'error';
  onClose: () => void;
  onConfirm?: () => void;
}

export default function ConfirmationModal({ isOpen, type, onClose, onConfirm }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'confirm':
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">Uyarı!</h2>
            <div className="my-6">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
                  <span className="text-red-500 text-4xl font-bold">!</span>
                </div>
              </div>
              <p className="text-center text-lg">Sabitlerden Çıkarılacaktır Emin Misiniz?</p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="w-[200px] h-12 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Vazgeç
              </button>
              <button
                onClick={onConfirm}
                className="w-[200px] h-12 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
              >
                Onayla
              </button>
            </div>
          </>
        );

      case 'success':
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">Başarılı</h2>
            <div className="my-6">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-center text-lg">Sabitler İçerisinden Çıkarıldı.</p>
            </div>
            <button
              onClick={onClose}
              className="w-[200px] h-12 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
            >
              TAMAM
            </button>
          </>
        );

      case 'error':
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">Uyarı!</h2>
            <div className="my-6">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-yellow-500 flex items-center justify-center">
                  <span className="text-yellow-500 text-4xl">!</span>
                </div>
              </div>
              <p className="text-center text-lg">Sabitler İçerisinden Çıkarılırken Hata Oluştu.</p>
            </div>
            <button
              onClick={onClose}
              className="w-[200px] h-12 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              TAMAM
            </button>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg p-8 w-[500px] flex flex-col items-center">
        {renderContent()}
      </div>
    </div>
  );
} 