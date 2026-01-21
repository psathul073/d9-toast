"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Icons from "./Icons.js";

const ENTER_ANIMATIONS = {
  top: "upToDown",
  bottom: "downToUp",
  center: "centerEnter",
};

const EXIT_ANIMATIONS = {
  bottom: "upToDownExit",
  top: "downToUpExit",
  center: "centerExit",
};

const Toast = ({
  id,
  message,
  stackIndex = 0,
  type = "success",
  theme = "light",
  position = "top-right",
  className = "",
  rtl = false,
  expand = "hover",
  duration = 4000,
  actions = [],
  remove,
  isStackHovered,
  progress = true,
  autoClose = true,
  closable = false,
  title = true,
  pauseOnHover = true,
  pauseOnFocusLoss = true,
}) => {
  const [exiting, setExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const shouldExpand = expand === "hover" ? isStackHovered : expand;
  const ariaRole = type === "error" ? "alert" : "status";

  // Styles [Animation]
  const { enterAnim, exitAnim } = useMemo(() => {
    // entry animation [based on position]
    const isTop = position.includes("top");
    const isBottom = position.includes("bottom");

    const baseEnter = isTop
      ? ENTER_ANIMATIONS.top
      : isBottom
        ? ENTER_ANIMATIONS.bottom
        : ENTER_ANIMATIONS.center;

    // exit animation [reverse direction]
    const baseExit = isTop
      ? EXIT_ANIMATIONS.top
      : isBottom
        ? EXIT_ANIMATIONS.bottom
        : EXIT_ANIMATIONS.center;

    return {
      enterAnim: `${baseEnter} 450ms cubic-bezier(0.165, 0.84, 0.44, 1)`,
      exitAnim: `${baseExit}  300ms cubic-bezier(0.165, 0.84, 0.44, 1)`,
    };
  }, [position]);

  // --- Helpers Fun ---

  // for exit
  const triggerExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    timeoutRef.current = setTimeout(() => remove(), 250); // Set and match exit animation duration.
  }, [remove, exiting]);

  // for pause.
  const handlePause = useCallback(() => {
    if (autoClose) setIsPaused(true);
  }, [autoClose]);

  // for resume.
  const handleResume = useCallback(() => {
    if (autoClose) setIsPaused(false);
  }, [autoClose]);

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

      const classNameStr =
        `action-btn ${theme === "colored" ? theme : btnType} ${a.className || ""
          }`.trim();
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
  }, [actions, type, id, theme]);

  const handleMouseEnter = pauseOnHover ? handlePause : undefined;
  const handleMouseLeave = pauseOnHover ? handleResume : undefined;

  // Start auto-close timer.
  useEffect(() => {
    // pause/resume when window focus changes.
    const handleBlur = () => pauseOnFocusLoss && handlePause();
    const handleFocus = () => pauseOnFocusLoss && handleResume();

    if (pauseOnFocusLoss) {
      window.addEventListener("blur", handleBlur);
      window.addEventListener("focus", handleFocus);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (pauseOnFocusLoss) {
        window.removeEventListener("blur", handleBlur);
        window.removeEventListener("focus", handleFocus);
      }
    };
  }, [pauseOnFocusLoss, handlePause, handleResume]);

  return (
    <div
      className={`toastWrapper ${shouldExpand ? "expanded" : "stacked"}`}
      dir={rtl ? "rtl" : "ltr"}
      style={{
        bottom: position.includes("bottom") ? "0%" : "",
      }}
    >
      <div
        data-stack={shouldExpand ? 0 : stackIndex}
        role={ariaRole}
        aria-live={ariaRole === "alert" ? "assertive" : "polite"}
        aria-atomic="true"
        tabIndex={0}
        aria-hidden={!shouldExpand && stackIndex > 0}
        style={{ animation: exiting ? exitAnim : enterAnim }}
        className={` d9-toast toast ${theme === "colored" ? type : theme
          } ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        {title && (
          <div className={`toastHeader ${type}`}>
            <div className="title">
              {type !== "default" && <Icons name={type || "success"} />}{" "}
              <p>{type.toUpperCase()}</p>
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
          <div className="toast-message__container">
            <div className="toast-message">
              {!title && type !== "default" && (
                <Icons name={type || "success"} className={type} />
              )}
              <p>{message || "No messages"}</p>
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
        ) : (
          <div style={{ padding: "4px" }}>{message || "No messages"}</div>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="toastActions">{actionButtons}</div>
        )}

        {/* Progress Bar */}
        {duration !== 0 && autoClose && (
          <div
            className={`progress-container ${type}`}
            style={{
              opacity: progress ? 1 : 0,
              height: progress ? "4px" : "0px",
              transition: "opacity 0.2s ease",
            }}
          >
            <div
              className={`toast-progress ${type}`}
              onAnimationEnd={triggerExit}
              style={{
                animationDuration: `${duration}ms`,
                animationPlayState: isPaused ? "paused" : "running",
                transformOrigin: rtl ? "right" : "left",
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Toast);
