import React, { useState, useContext, createContext } from 'react';

const ToastMessageContext = createContext();

export const ToastMessageProvider = ({ children }) => {
  const toastMessage = useToastMessageProvider();
  return (
    <ToastMessageContext.Provider value={toastMessage}>
      {children}
    </ToastMessageContext.Provider>
  );
};

export const useToastMessage = () => useContext(ToastMessageContext);

const useToastMessageProvider = () => {
  const [toastMessage, setToastMessage] = useState({ show: false });

  const showToastMessage = toast => {
    setToastMessage({
      show: true,
      ...toast,
    });
  };

  return { toastMessage, setToastMessage, showToastMessage };
};
