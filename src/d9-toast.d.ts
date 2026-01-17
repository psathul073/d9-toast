declare module "d9-toast" {
  import * as React from "react";

  /* =========================================
   * Core Types
   * ========================================= */

  /**
   * Visual type of a toast.
   * Controls icon, color, and default sound.
   */
  export type ToastType =
    | "success"
    | "error"
    | "info"
    | "warning"
    | "loading"
    | "submit";

  /**
   * Visual theme variant for toast appearance.
   */
  export type ToastTheme = "light" | "dark" | "colored";

  /**
   * Screen position where the toast appears.
   */
  export type ToastPosition =
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center"
    | "center-top"
    | "center-bottom";

  /* =========================================
   * Actions & Audio
   * ========================================= */

  /**
   * Single button/action displayed inside a toast.
   * Useful for actions like Undo, Retry, or Confirm.
   */
  export interface ToastAction {
    /**
     * Text label shown on the action button.
     */
    text: string;

    /**
     * Optional extra class names for custom styling.
     */
    className?: string;

    /**
     * Callback triggered when the action button is clicked.
     * Receives the toast id as argument.
     */
    callback?: (toast: { id: string }) => void;
  }

  /**
   * Audio configuration for toast sounds.
   */
  export interface ToastAudioOptions {
    /**
     * Enable or disable toast sound.
     */
    enabled?: boolean;

    /**
     * Audio volume (range: 0–1).
     */
    volume?: number;

    /**
     * Custom audio file URL.
     */
    audioFile?: string;

    /**
     * Cooldown in milliseconds between sounds.
     */
    cooldown?: number;
  }

  /* =========================================
   * Toast Options
   * ========================================= */

  /**
   * Configuration options for a toast notification.
   */
  export interface ToastOptions {
    /**
     * Main message content.
     * Can be a string or a React node.
     */
    message?: string | React.ReactNode;

    /**
     * Visual type of the toast (affects color & icon).
     */
    type?: ToastType;

    /**
     * Duration in milliseconds before auto close.
     * Use `0` to make the toast persistent.
     */
    duration?: number;

    /**
     * Screen position where the toast appears.
     */
    position?: ToastPosition;

    /**
     * Visual theme variant.
     */
    theme?: ToastTheme;

    /**
     * Action buttons shown at the bottom of the toast.
     */
    actions?: ToastAction[];

    /**
     * Extra custom class names.
     */
    className?: string;

    /**
     * Whether to show the toast title/header.
     */
    title?: boolean;

    /**
     * Whether to show the progress bar.
     */
    progress?: boolean;

    /**
     * Allow manual close via close (X) button.
     */
    closable?: boolean;

    /**
     * Whether the toast auto-closes after duration.
     */
    autoClose?: boolean;

    /**
     * Pause the timer when the toast is hovered.
     */
    pauseOnHover?: boolean;

    /**
     * Pause the timer when the window/tab loses focus.
     */
    pauseOnFocusLoss?: boolean;

    /**
     * Enable right-to-left text direction.
     */
    rtl?: boolean;

    /**
      * Controls the stacking behavior. 
      * 'hover' will show 3 toasts stacked until mouse entry.
      */
    expand?: boolean | "hover";

    /**
     * Audio configuration for this toast.
     */
    audio?: ToastAudioOptions;
  }

  /* =========================================
   * Toast API (PUBLIC)
   * ========================================= */

  /**
   * Public toast API used to trigger notifications.
   */
  export const toast: {
    /**
     * Default sound URLs used by the toast system.
     */
    sounds: {
      default: string;
      success: string;
      warning: string;
      error: string;
      info: string;
    };

    /**
     * Show a success toast.
     */
    success(
      message: string | React.ReactNode,
      options?: ToastOptions
    ): string | undefined;

    /**
     * Show an error toast.
     */
    error(
      message: string | React.ReactNode,
      options?: ToastOptions
    ): string | undefined;

    /**
     * Show an info toast.
     */
    info(
      message: string | React.ReactNode,
      options?: ToastOptions
    ): string | undefined;

    /**
     * Show a warning toast.
     */
    warning(
      message: string | React.ReactNode,
      options?: ToastOptions
    ): string | undefined;

    /**
        * Wraps a promise and updates the toast automatically.
        */
    promise<T>(
      promise: Promise<T> | (() => Promise<T>),
      messages: {
        /**
         * Message shown while the promise is pending.
         */
        loading: string | React.ReactNode;

        /**
         * Message shown when the promise resolves.
         */
        success: string | React.ReactNode | ((value: T) => string | React.ReactNode);

        /**
         * Message shown when the promise rejects.
         */
        error: string | React.ReactNode | ((error: any) => string | React.ReactNode);
      },
      options?: ToastOptions
    ): Promise<T>;

    /**
     * Dismiss a toast by its id.
     */
    dismiss(id: string): void;

    /**
     * Dismiss all active toasts.
     */
    dismissAll(): void;
  };

  /* =========================================
   * Provider
   * ========================================= */

  /**
   * Props for the ToastProvider component.
   */
  export interface ToastProviderProps {
    /**
     * Application children wrapped by ToastProvider.
     */
    children: React.ReactNode;
  }

  /**
   * Provider component that enables toast functionality.
   * Must wrap your application root.
   */
  export const ToastProvider: React.FC<ToastProviderProps>;
}
