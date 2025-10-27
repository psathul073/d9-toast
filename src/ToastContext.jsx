import React, { createContext, useCallback, useContext, useState } from "react";
import Toast from "./Toast";
import "./toast.css";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Generate unique ID safely
  const generateId = () => Date.now() + Math.random();

  // Positions.
  const positions = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "center",
    "center-top",
    "center-bottom",
  ];

  // Show toast..
  const showToast = useCallback((toast) => {
    const newToast = { id: generateId(), ...toast };
    setToasts((prev) => [...prev, newToast]);

    if (toast.duration !== 0 && toast.autoClose) {
      setTimeout(() => removeToast(newToast.id), toast.duration || 5000);
    }
  }, []);

  // Remove toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Remove all toast.
  const removeToastAll = () => {
    if (toasts.length > 0) {
      setToasts([]);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast, removeToastAll }}>
      {children}

      <div
        className={`toastContainer ${
          positions.some((p) => p === toasts[0]?.position)
            ? toasts[0]?.position
            : "top-right"
        }`}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            remove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
