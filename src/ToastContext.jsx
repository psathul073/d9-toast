import React, { createContext, useCallback, useContext, useState } from "react";
import Toast from "./Toast";
import "./toast.css";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children, position = "top-right" }) => {
  const [toasts, setToasts] = useState([]);

  // Generate unique ID safely
  const generateId = () => Date.now() + Math.random();


  // Show toast
  const showToast = useCallback((toast) => {
    const newToast = { id: generateId(), ...toast };
    setToasts((prev) => [...prev, newToast]);

    if (toast.duration !== 0) {
      setTimeout(() => removeToast(newToast.id), toast.duration || 5000);
    }
  }, []);

  // Remove toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      <div className={`toastContainer ${position}`}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            position={position}
            remove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
