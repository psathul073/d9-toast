declare module "d9-toast" {
  import React from "react";

  export type ToastType =
    | "success"
    | "error"
    | "info"
    | "warning"
    | "loading"
    | "submit";

  export interface ToastAction {
    text: string;
    callback?: (toast: { id: number }) => void;
  }

  export interface ToastOptions {
    message: string;
    type?: ToastType;
    duration?: number;
    actions?: ToastAction[];
    theme?: "light" | "dark";
    progress?: boolean;
    closable?: boolean;
    pauseOnHover?: boolean;
    pauseOnFocusLoss?: boolean;
    className?: string; 
  }

  export interface ToastProviderProps {
    children: React.ReactNode;
    position?:
      | "top-right"
      | "top-left"
      | "bottom-right"
      | "bottom-left"
      | "center"
      | "center-top"
      | "center-bottom";
  }

  export const ToastProvider: React.FC<ToastProviderProps>;

  export const useToast: () => {
    showToast: (toast: ToastOptions) => void;
    removeToast: (id: number) => void;
  };
}
