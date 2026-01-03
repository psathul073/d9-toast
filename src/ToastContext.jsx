"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import Toast from "./Toast";
import "./toast.css";

export const DEFAULT_TOAST_SOUND =
  "https://cdn.jsdelivr.net/gh/psathul073/d9-toast-assets@main/toast.m4a";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const audioSettings = {
  audioFile: DEFAULT_TOAST_SOUND,
  volume: 0.8,
  enabled: true,
  cooldown: 500,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const lastSoundTimeRef = useRef(0);

  // Audio player..
  const playAudio = useCallback(({ audioFile, volume = 0.8 }) => {
    if (!audioFile || typeof window === "undefined") return;

    try {
      const audio = new Audio(audioFile);
      audio.volume = volume;
      audio.play().catch(() => {});
    } catch (err) {
      console.error("Audio play error:", err);
    }
  }, []);

  // Generate unique ID safely
  const generateId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString() + Math.random().toString(36);

  // Show toast..
  const showToast = useCallback(
    (toast) => {
      const newToast = {
        id: generateId(),
        ...toast,
        audio: {
          enabled: toast.audio?.enabled ?? audioSettings.enabled, // Toast-specific audio setting.
          volume: toast.audio?.volume ?? audioSettings.volume, // Custom volume per toast.
          audioFile: toast.audio?.audioFile ?? audioSettings.audioFile, // Custom sound per toast.
          cooldown: toast.audio?.cooldown ?? audioSettings.cooldown, // Custom cooldown im ms.
        },
      };
      setToasts((prev) => [...prev, newToast]);

      const { audio, type } = newToast;
      const now = Date.now();
      const cooldown = Number(audio.cooldown) || audioSettings.cooldown;
      const canPlaySound = now - lastSoundTimeRef.current >= cooldown;
      const bypassCooldown = type === "error"; // Bypass error toast

      // Play audio whenever a new toast appears.
      if (
        audio.enabled &&
        audio.audioFile &&
        (canPlaySound || bypassCooldown)
      ) {
        lastSoundTimeRef.current = now;
        playAudio({
          audioFile: audio.audioFile,
          volume: audio.volume,
        });
      }

      const shouldAutoClose = toast.autoClose !== false && toast.duration !== 0;

      if (shouldAutoClose) {
        setTimeout(() => removeToast(newToast.id), toast.duration || 5000);
      }
      return newToast?.id;
    },
    [playAudio]
  );

  // Remove toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => {
      const newToasts = prev.filter((t) => t.id !== id);
      return newToasts;
    });
  }, []);

  // Remove all toast.
  const removeToastAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Group toasts by there positions..
  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || "top-right";
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {});

  return (
    <ToastContext.Provider
      value={{
        showToast,
        removeToast,
        removeToastAll,
      }}
    >
      {children}
      {/* Render separate containers for each position */}
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div key={position} className={`toastContainer ${position}`}>
          {positionToasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              remove={() => removeToast(toast.id)}
            />
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};
