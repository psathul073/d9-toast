"use client";

import { memo } from "react";

const Icons = ({ name, className = " " }) => {
  const icons = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        style={{
          fontSize: "20px",
          backgroundColor: "transparent",
          flexShrink: 0,
        }}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M7.53 11.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l7-7a.75.75 0 0 0-1.06-1.06L10 14.44z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        style={{
          backgroundColor: "transparent",
          fontSize: "20px",
          flexShrink: 0,
        }}
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1m1 4h-2v-2h2z"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        style={{
          backgroundColor: "transparent",
          fontSize: "20px",
          flexShrink: 0,
        }}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m-.5 5a1 1 0 1 0 0 2h.5a1 1 0 1 0 0-2zM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        style={{
          backgroundColor: "transparent",
          fontSize: "20px",
          flexShrink: 0,
        }}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M9.616 3.642c1.058-1.839 3.71-1.839 4.768 0l8.043 13.988c1.054 1.833-.27 4.12-2.384 4.12H3.957c-2.115 0-3.438-2.287-2.384-4.12zM12 8.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75m.568 9.25a.75.75 0 0 0-1.115-1.003l-.01.011a.75.75 0 0 0 1.114 1.004z"
          clipRule="evenodd"
        />
      </svg>
    ),
    loading: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        style={{
          backgroundColor: "transparent",
          fontSize: "20px",
          flexShrink: 0,
        }}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path
            strokeDasharray="16"
            strokeDashoffset="16"
            d="M12 3c4.97 0 9 4.03 9 9"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.3s"
              values="16;0"
            />
            <animateTransform
              attributeName="transform"
              dur="1.5s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
          <path
            strokeDasharray="64"
            strokeDashoffset="64"
            strokeOpacity=".3"
            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="1.2s"
              values="64;0"
            />
          </path>
        </g>
      </svg>
    ),
    submit: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        style={{
          backgroundColor: "transparent",
          fontSize: "20px",
          flexShrink: 0,
        }}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path
            strokeDasharray="2 4"
            strokeDashoffset="6"
            d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"
          >
            <animate
              attributeName="stroke-dashoffset"
              dur="0.6s"
              repeatCount="indefinite"
              values="6;0"
            />
          </path>
          <path
            strokeDasharray="32"
            strokeDashoffset="32"
            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.1s"
              dur="0.4s"
              values="32;0"
            />
          </path>
          <path strokeDasharray="10" strokeDashoffset="10" d="M12 16v-7.5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.5s"
              dur="0.2s"
              values="10;0"
            />
          </path>
          <path
            strokeDasharray="6"
            strokeDashoffset="6"
            d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.7s"
              dur="0.2s"
              values="6;0"
            />
          </path>
        </g>
      </svg>
    ),
    X: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        style={{
          backgroundColor: "transparent",
          fontSize: "20px",
          flexShrink: 0,
        }}
      >
        <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
          <path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06" />
          <path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0" />
        </g>
      </svg>
    ),
  };
  
  return icons[name] ?? null;
};
export default memo(Icons);
