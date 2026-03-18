"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import Toast from "./Toast";
import {
  PromiseMessages,
  ToastCallable,
  ToastOptions,
  ToastPosition,
} from "./types";

interface ToastItem extends ToastOptions {
  id: string;
}

// Audio.
const sounds = {
  default:
    "https://cdn.jsdelivr.net/gh/psathul073/d9-toast-assets@main/default.mp3",
  success:
    "https://cdn.jsdelivr.net/gh/psathul073/d9-toast-assets@main/success.mp3",
  warning:
    "https://cdn.jsdelivr.net/gh/psathul073/d9-toast-assets@main/warning.mp3",
  error:
    "https://cdn.jsdelivr.net/gh/psathul073/d9-toast-assets@main/errors.mp3",
  info: "https://cdn.jsdelivr.net/gh/psathul073/d9-toast-assets@main/info.mp3",
};

const audioCache: Record<string, HTMLAudioElement> = {}; // Cache for audio objects..

const audioSettings = {
  audioFile: sounds.default,
  volume: 0.6,
  enabled: true,
  cooldown: 500,
};

interface ToastRef {
  showToast: (toast: ToastOptions) => string;
  removeToast: (id: string) => void;
  removeToastAll: () => void;
  promiseToast: <T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: PromiseMessages<T>,
    options?: ToastOptions,
  ) => Promise<T>;
}

// INTERNAL reference...
let toastRef: ToastRef | null = null;

// For public toast API.
const warn = () => {
  console.warn(
    "D9-Toast: ToastProvider is not mounted. Ensure it wraps your app.",
  );
  return undefined;
};

/** * CALLABLE API CORE */
const toastBase: ToastCallable = ((msg, opts = {}) => {
  return toastRef
    ? toastRef.showToast({
        type: "default",
        title: false,
        progress: false,
        duration: 3000,
        message: msg,
        ...opts,
      })
    : warn();
}) as ToastCallable;

toastBase.sounds = sounds;

toastBase.success = (msg, opts = {}) =>
  toastRef
    ? toastRef.showToast({ type: "success", message: msg, ...opts })
    : warn();

toastBase.error = (msg, opts = {}) =>
  toastRef
    ? toastRef.showToast({ type: "error", message: msg, ...opts })
    : warn();

toastBase.info = (msg, opts = {}) =>
  toastRef
    ? toastRef.showToast({ type: "info", message: msg, ...opts })
    : warn();

toastBase.warning = (msg, opts = {}) =>
  toastRef
    ? toastRef.showToast({ type: "warning", message: msg, ...opts })
    : warn();

toastBase.promise = <T,>(
  promise: Promise<T> | (() => Promise<T>),
  messages: PromiseMessages<T>,
  opts: ToastOptions = {},
): Promise<T> => {
  const defaultMessages: PromiseMessages<T> = {
    loading: "Loading...",
    success: "Success",
    error: "Error",
  };

  const finalMessages = messages ?? defaultMessages;

  return toastRef
    ? toastRef.promiseToast(promise, finalMessages, opts)
    : Promise.reject(
        new Error(
          "D9-Toast: ToastProvider is not mounted. Ensure it wraps your app.",
        ),
      );
};

toastBase.dismiss = (id) => toastRef?.removeToast(id);
toastBase.dismissAll = () => toastRef?.removeToastAll();

export const toast = toastBase;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const lastSoundTimeRef = useRef<number>(0);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
    }, 50);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 50);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Audio player..
  const playAudio = useCallback(
    ({ audioFile, volume = 0.6 }: { audioFile: string; volume?: number }) => {
      if (!audioFile || typeof window === "undefined") return;

      try {
        // Check cache..
        let audio = audioCache[audioFile];
        if (!audio) {
          audio = new Audio(audioFile);
          audio.preload = "auto";
          audioCache[audioFile] = audio;
        }
        // Reset time to allow rapid replay...
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch(() => {});
      } catch (err) {
        console.error("Audio play error:", err);
      }
    },
    [],
  );

  // Generate unique ID safely
  const generateId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`)
      : Date.now().toString() + Math.random().toString(36);

  // Show toast..
  const showToast = useCallback(
    (toast: ToastOptions): string => {
      const newToast: ToastItem = {
        id: generateId(),
        ...toast,
        audio: {
          enabled: toast.audio?.enabled ?? audioSettings.enabled,
          volume: toast.audio?.volume ?? audioSettings.volume,
          audioFile: toast.audio?.audioFile ?? audioSettings.audioFile,
          cooldown: toast.audio?.cooldown ?? audioSettings.cooldown,
        },
      };
      // Limit to last 10 toasts to prevent memory overflow...
      setToasts((prev) => [newToast, ...prev].slice(0, 4));

      const { audio, type } = newToast;
      const now = Date.now();
      const cooldown = Number(audio?.cooldown ?? audioSettings.cooldown);
      const canPlaySound = now - lastSoundTimeRef.current >= cooldown;
      const bypassCooldown = type === "error"; // Bypass error toast

      // Play audio whenever a new toast appears.
      if (
        audio?.enabled &&
        audio?.audioFile &&
        (canPlaySound || bypassCooldown)
      ) {
        lastSoundTimeRef.current = now;
        playAudio({
          audioFile: audio.audioFile,
          volume: audio.volume,
        });
      }

      return newToast?.id;
    },
    [playAudio],
  );

  // Remove toast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => {
      const newToasts = prev.filter((t) => t.id !== id);
      return newToasts;
    });
  }, []);

  // Update toast
  const updateToast = useCallback((id: string, updates: Partial<ToastItem>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  }, []);

  // Promise toast..
  const promiseToast = useCallback(
    <T,>(
      promiseOrFn: Promise<T> | (() => Promise<T>),
      messages: PromiseMessages<T>,
      options: ToastOptions = {},
    ): Promise<T> => {
      const id = showToast({
        type: "loading",
        message: messages.loading,
        autoClose: false,
        ...options,
      });

      const promise =
        typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;

      Promise.resolve(promise)
        .then((res) => {
          updateToast(id, {
            type: "success",
            message:
              typeof messages.success === "function"
                ? messages.success(res)
                : messages.success,
            closable: true,
            autoClose: true, // Re-enable autoClose for success...
            duration: 3000, // Reset duration..
          });

          return res;
        })
        .catch((err) => {
          updateToast(id, {
            type: "error",
            message:
              typeof messages.error === "function"
                ? messages.error(err)
                : messages.error,
            closable: true,
            autoClose: true,
            duration: 3000,
          });

          throw err;
        });

      return promise;
    },
    [showToast, updateToast],
  );

  // Remove all toast.
  const removeToastAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Group toasts by there positions..
  const groupedToasts = toasts.reduce<
    Partial<Record<ToastPosition, ToastItem[]>>
  >((acc, toast) => {
    const position = toast.position || "top-right";
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {});

  // Connect context >>> toast API (ONCE).
  useEffect(() => {
    toastRef = {
      showToast,
      removeToast,
      removeToastAll,
      promiseToast,
    };

    return () => {
      toastRef = null;
    };
  }, [showToast, removeToast, removeToastAll, promiseToast]);

  return (
    <>
      {children}
      {/* Render separate containers for each position */}
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`toastViewport ${position}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="toastContainer">
            {positionToasts.map((toast, index) => (
              <Toast
                key={toast.id}
                {...toast}
                stackIndex={index}
                isStackHovered={isHovering}
                remove={() => removeToast(toast.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
