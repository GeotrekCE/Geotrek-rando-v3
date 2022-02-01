import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FormattedMessage } from 'react-intl';
import { Cross } from 'components/Icons/Cross';

interface PopupProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const PopupContent: React.FC<PopupProps> = ({ children, onClose }) => {
  useEffect(() => {
    if (onClose === undefined) {
      return;
    }
    const handleClose = (event: { key: string }): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    global.addEventListener('keydown', handleClose);
    return () => global.removeEventListener('keydown', handleClose);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 overflow-y-auto overscroll-contain"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      style={{ zIndex: 901 }}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {onClose !== undefined && (
              <button className="flex self-end mb-4" type="button" onClick={onClose}>
                <Cross size={24} />
                <FormattedMessage id={'details.close'} />
              </button>
            )}
            <div className="sm:flex sm:items-start">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Popup: React.FC<PopupProps> = props => {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  useEffect(() => {
    container.classList.add('popup-wrapper');
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(<PopupContent {...props} />, container);
};

export default Popup;
