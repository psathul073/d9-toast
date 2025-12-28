declare module "d9-toast" {
  import React from "react";

  /** Toast type (icon + header color) */
  export type ToastType =
    | "success"
    | "error"
    | "info"
    | "warning"
    | "loading"
    | "submit";

  /** Theme variants */
  export type ToastTheme = "light" | "dark" | "colored";

  /** Available toast positions */
  export type ToastPosition =
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center"
    | "center-top"
    | "center-bottom";

  /** Single button/action displayed inside a toast */
  export interface ToastAction {
    /** Text label for the action button */
    text: string;
    /** Extra custom class names */
    className: string;
    /** Optional callback triggered on click */
    callback?: (toast: { id: number }) => void;
  }

  /** Toast configuration options */
  export interface ToastOptions {
    /** Main message; can be string or any React node (you render non-strings as-is) */
    message: string | React.ReactNode;
    /** Visual type (color/icon) */
    type?: ToastType;
    /** Duration in ms before auto-close (0 = persistent) */
    duration?: number;
    /** Optional buttons shown inside the toast */
    actions?: ToastAction[];
    /** Visual theme */
    theme?: ToastTheme;
    /** Weather to show toast title */
    title?: boolean;
    /** Whether to show progress bar */
    progress?: boolean;
    /** Allow manual close via X button */
    closable?: boolean;
    /** Pause timer when hovered */
    pauseOnHover?: boolean;
    /** Pause timer when window/tab loses focus */
    pauseOnFocusLoss?: boolean;
    /** Extra custom class names */
    className?: string;
    /** Where to place the toast on screen */
    position?: ToastPosition;
    /** Whether the toast auto-closes after duration */
    autoClose?: boolean;
    
  }

  /** Toast provider props for context setup */
  export interface ToastProviderProps {
    /** App children to wrap with ToastProvider */
    children: React.ReactNode;
  }

  export interface ToastData extends ToastOptions {
    id: number;
  }

  /** Context value shape */
  export interface ToastContextValue {
    /** Show a toast with given options */
    showToast: (toast: ToastOptions) => void;
    /** Remove a toast by ID */
    removeToast: (id: number) => void;
    /** Remove all active toasts */
    removeToastAll: () => void;
  }

  /** Context provider component */
  export const ToastProvider: React.FC<ToastProviderProps>;

  /** Hook to trigger and manage toasts */
  export const useToast: () => ToastContextValue;

  /** Export the Toast component props/type for advanced consumers */
  export interface ToastProps extends ToastData {
    remove: () => void;
  }
  export const Toast: React.FC<ToastProps>;
}
