import React, { useEffect, useRef, useState } from "react";
import "./toast.css";
import Icons from "./Icons";

const Toast = ({
  id,
  message,
  type = "info",
  theme = "light",
  className = "",
  duration = 5000,
  actions = [],
  remove,
  position,
  progress = true,
  closable = true,
  pauseOnHover = true,
  pauseOnFocusLoss = true,
}) => {
  const intervalRef = useRef(null); // stores the interval ID
  const start = useRef(Date.now()); // stores the moment timer started
  const remaining = useRef(duration); // how much time is left
  const [progressWidth, setProgressWidth] = useState(100); // progress bar %
  const [isPaused, setPaused] = useState(false); // For timer pause

  // Start auto-close timer.
  useEffect(() => {
    if (duration !== 0) {
      startTimer();
    }

    // pause/resume when window focus changes.
    const handleBlur = () => pauseOnFocusLoss && pauseTimer();
    const handleFocus = () => pauseOnFocusLoss && resumeTimer();

    if (pauseOnFocusLoss) {
      window.addEventListener("blur", handleBlur);
      window.addEventListener("focus", handleFocus);
    }

    return () => {
      clearInterval(intervalRef.current);
      if (pauseOnFocusLoss) {
        window.removeEventListener("blur", handleBlur);
        window.removeEventListener("focus", handleFocus);
      }
    };
  }, [duration, pauseOnFocusLoss]);

  // --- Helpers Fun ---
  // for start
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      // time to passed...
      const elapsed = Date.now() - start.current;
      // time to left...
      const timeToLeft = remaining.current - elapsed;
      // set shrink bar...
      setProgressWidth((timeToLeft / duration) * 100);

      if (timeToLeft <= 0) {
        // stop timer...
        clearInterval(intervalRef.current);
        // remove toast.
        remove();
      }
    }, 100);
  };

  // for pause
  const pauseTimer = () => {
    if (isPaused) return;
    clearInterval(intervalRef.current);
    remaining.current = remaining.current - (Date.now() - start.current);
    setPaused(true);
  };

  // for resume
  const resumeTimer = () => {
    if (!isPaused) return;
    start.current = Date.now();
    setPaused(false);
    startTimer();
  };

  // Styles
  const animation = `${
    (position.startsWith("top") && "upToDown") ||
    (position.startsWith("bottom") && "downToUp") ||
    (position.endsWith("top") && "upToDown") ||
    (position.endsWith("bottom") && "downToUp")
  } 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;

  return (
    <>
      <div
        style={{ animation }}
        className={`toast ${theme} ${className}`}
        onMouseEnter={pauseOnHover ? pauseTimer : undefined}
        onMouseLeave={pauseOnHover ? resumeTimer : undefined}
      >
        {/* Header */}
        <div className={`toastHeader ${type}`}>
          <div className="title">
            <Icons name={type} /> <p>{type.toUpperCase()}</p>
          </div>

          {closable && (
            <button onClick={remove}>
              <Icons name={"X"} />
            </button>
          )}
        </div>

        {/* Message */}
        <p style={{ padding: "4px" }}>{message}</p>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="toastActions">
            {actions.map((a, idx) => {
              if (idx < 2) {
                return (
                  <button
                    key={idx}
                    onClick={() => a.callback?.({ id })}
                    className={`action-btn ${
                      actions.length === 1
                        ? `action-btnA ${type}`
                        : idx === 0
                        ? `action-btnB ${type}`
                        : `action-btnA ${type}`
                    }`}
                  >
                    {a.text}
                  </button>
                );
              }
            })}
          </div>
        )}

        {/* Progress Bar */}
        {progress && duration !== 0 && (
          <div className={`progress-container ${type}`}>
            <div
              className={`toast-progress ${type}`}
              style={{
                width: `${progressWidth}%`,
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Toast;
