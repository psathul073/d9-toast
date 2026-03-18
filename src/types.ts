import * as React from "react";

/* =========================================
 * Core Types
 * ========================================= */

export type ToastType =
  | "default"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading"
  | "submit";

export type ToastTheme = "light" | "dark" | "colored";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "center"
  | "center-top"
  | "center-bottom";

/* =========================================
 * Actions
 * ========================================= */

export interface ToastAction {
  text: string;
  className?: string;
  callback?: (toast: { id: string }) => void;
}

/* =========================================
 * Audio
 * ========================================= */

export interface ToastAudioOptions {
  enabled?: boolean;
  volume?: number;
  audioFile?: string;
  cooldown?: number;
}

/* =========================================
 * Toast Options
 * ========================================= */

export interface ToastOptions {
  message?: string | React.ReactNode;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  theme?: ToastTheme;
  actions?: ToastAction[];
  className?: string;
  title?: boolean;
  progress?: boolean;
  closable?: boolean;
  autoClose?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  rtl?: boolean;
  expand?: boolean | "hover";
  audio?: ToastAudioOptions;
}

/* =========================================
 * Promise Toast
 * ========================================= */

export interface PromiseMessages<T> {
  loading: string | React.ReactNode;
  success: string | React.ReactNode | ((value: T) => string | React.ReactNode);
  error: string | React.ReactNode | ((error: any) => string | React.ReactNode);
}

/* =========================================
 * Toast Callable API
 * ========================================= */

export interface ToastCallable {
  (
    message: string | React.ReactNode,
    options?: ToastOptions,
  ): string | undefined;

  sounds: {
    default: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };

  success(
    message: string | React.ReactNode,
    options?: ToastOptions,
  ): string | undefined;

  error(
    message: string | React.ReactNode,
    options?: ToastOptions,
  ): string | undefined;

  info(
    message: string | React.ReactNode,
    options?: ToastOptions,
  ): string | undefined;

  warning(
    message: string | React.ReactNode,
    options?: ToastOptions,
  ): string | undefined;

  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: PromiseMessages<T>,
    options?: ToastOptions,
  ): Promise<T>;

  dismiss(id: string): void;

  dismissAll(): void;
}

/* =========================================
 * Provider
 * ========================================= */

export interface ToastProviderProps {
  children: React.ReactNode;
}
