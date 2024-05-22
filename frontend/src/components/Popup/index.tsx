import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FormattedMessage } from 'react-intl';
import { Cross } from 'components/Icons/Cross';

interface PopupProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const PopupContent: React.FC<PopupProps> = ({ children, onClose, title }) => {
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
      className="fixed inset-0 overflow-y-auto overscroll-contain z-[901]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0 overscroll-contain">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true" />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {onClose !== undefined && (
          <div className="absolute inset-0" onClick={onClose} role="button">
            <span className="sr-only">
              <FormattedMessage id={'details.close'} />
            </span>
          </div>
        )}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-10">
          <div className="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between mb-4">
              {title !== undefined ? <h1 className="text-xl">{title}</h1> : <span />}
              {onClose !== undefined && (
                <button className="flex self-end" type="button" onClick={onClose}>
                  <Cross size={24} aria-hidden />
                  <FormattedMessage id={'details.close'} />
                </button>
              )}
            </div>
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
  }, [container]);

  return createPortal(<PopupContent {...props} />, container);
};

export default Popup;
