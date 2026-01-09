"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Icons from "./Icons.js";

const Toast = ({
  id,
  message,
  type = "success",
  theme = "light",
  position = "top-right",
  className = "",
  duration = 4000,
  actions = [],
  remove,
  progress = true,
  autoClose = true,
  closable = false,
  title = true,
  pauseOnHover = true,
  pauseOnFocusLoss = true,
}) => {
  const [progressWidth, setProgressWidth] = useState(100);
  const [exiting, setExiting] = useState(false);
  const [isPausedState, setIsPausedState] = useState(false); // Only for UI/State checks..
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const initialDuration = useRef(duration);
  const start = useRef(Date.now());
  const remaining = useRef(duration);
  const isPausedRef = useRef(false); // Use for internal logic to avoid loops..

  // Styles [Animation]
  const { enterAnim, exitAnim } = useMemo(() => {
    // entry animation [based on position]
    const baseEnter =
      (position.startsWith("top") && "upToDown") ||
      (position.startsWith("bottom") && "downToUp") ||
      (position.endsWith("top") && "upToDown") ||
      (position.endsWith("bottom") && "downToUp") ||
      "centerEnter";

    // exit animation [reverse direction]
    const baseExit =
      (position.startsWith("top") && "downToUpExit") ||
      (position.startsWith("bottom") && "upToDownExit") ||
      (position.endsWith("top") && "downToUpExit") ||
      (position.endsWith("bottom") && "upToDownExit") ||
      "centerExit";

    return {
      enterAnim: `${baseEnter} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
      exitAnim: `${baseExit} 0.25s cubic-bezier(0.39, 0.575, 0.565, 1) forwards`,
    };
  }, [position]);

  // --- Helpers Fun ---

  // for exit
  const triggerExit = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setExiting(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    timeoutRef.current = setTimeout(() => remove(), 250); // Set and match exit animation duration.
  }, [remove]);

  // for start
  const startTimer = useCallback(() => {
    if (!autoClose || initialDuration.current === 0) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    // Update the start point every time we (re)start the interval.
    start.current = Date.now();

    intervalRef.current = setInterval(() => {
      // If we are paused, we don't do anything, but the interval stays alive.
      if (isPausedRef.current) return;

      // time to passed...
      const elapsed = Date.now() - start.current;
      // time to left...
      const timeToLeft = remaining.current - elapsed;
      // set shrink bar...
      const percent = (timeToLeft / initialDuration.current) * 100;
      setProgressWidth(Math.max(0, percent));

      if (timeToLeft <= 0) {
        // stop timer...
        clearInterval(intervalRef.current);
        // remove toast.
        triggerExit();
      }
    }, 50); // Add 50ms is smoother for progress bars..
  }, [autoClose, triggerExit]);

  // for pause
  const pauseTimer = useCallback(() => {
    if (!autoClose || isPausedRef.current) return;

    // Calculate exactly what was left at the moment of pause..
    const elapsed = Date.now() - start.current;
    remaining.current = remaining.current - elapsed;

    isPausedRef.current = true;
    setIsPausedState(true);

    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [autoClose]);

  // for resume
  const resumeTimer = useCallback(() => {
    if (!autoClose || !isPausedRef.current) return;
    isPausedRef.current = false;
    setIsPausedState(false);
    startTimer();
  }, [autoClose, startTimer]);

  // Toast actions...
  const actionButtons = useMemo(() => {
    if (actions.length === 0) return null;

    return actions.slice(0, 2).map((a, idx) => {
      // Dynamic class names..
      const btnType =
        actions.length === 1
          ? `action-btnA__${type}`
          : idx === 0
            ? `action-btnB__${type}`
            : `action-btnA__${type}`;

      const classNameStr = `action-btn ${btnType} ${a.className || ""}`.trim();
      return (
        <button
          aria-label={`Action ${a.text}`}
          key={idx}
          onClick={() => a.callback?.({ id })}
          className={classNameStr}
        >
          {a.text}
        </button>
      );
    });
  }, [actions, type, id]);

  const handleMouseEnter = pauseOnHover ? pauseTimer : undefined;
  const handleMouseLeave = pauseOnHover ? resumeTimer : undefined;

  // Start auto-close timer.
  useEffect(() => {
    startTimer();

    // pause/resume when window focus changes.
    const handleBlur = () => pauseOnFocusLoss && pauseTimer();
    const handleFocus = () => pauseOnFocusLoss && resumeTimer();

    if (pauseOnFocusLoss) {
      window.addEventListener("blur", handleBlur);
      window.addEventListener("focus", handleFocus);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (pauseOnFocusLoss) {
        window.removeEventListener("blur", handleBlur);
        window.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  return (
    <>
      <div
        style={{ animation: exiting ? exitAnim : enterAnim }}
        className={`toast ${theme === "colored" ? type : theme} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        {title && (
          <div className={`toastHeader ${type}`}>
            <div className="title">
              <Icons name={type} /> <p>{type.toUpperCase()}</p>
            </div>

            {closable && (
              <button
                className="close-button"
                aria-label="Close button"
                onClick={() => triggerExit()}
              >
                <Icons name={"X"} />
              </button>
            )}
          </div>
        )}

        {/* Message */}
        {typeof message === "string" ? (
          <>
            <div className="toast-message__container">
              <div className="toast-message">
                {!title && <Icons name={type} className={type} />}
                <p>{message}</p>
              </div>
              {closable && !title && (
                <button
                  className="close-button"
                  aria-label="Close button"
                  onClick={() => triggerExit()}
                >
                  <Icons name={"X"} />
                </button>
              )}
            </div>
          </>
        ) : (
          <div style={{ padding: "4px" }}>{message}</div>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="toastActions">{actionButtons}</div>
        )}

        {/* Progress Bar */}
        {progress && duration !== 0 && autoClose && (
          <div className={`progress-container ${type}`}>
            <div
              className={`toast-progress ${type}`}
              style={{
                width: `${progressWidth}%`,
                transition: isPausedState ? "none" : "width 50ms linear",
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(Toast);
