"use client";

import { memo } from "react";

const Icons = ({ name, className = " " }) => {
  const icons = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1.5em"
        height="1.5em"
        className={className}
        style={{
          backgroundColor: "transparent",
          flexShrink: 0,
        }}
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M9.29 16.29L5.7 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.59 7.59a.996.996 0 0 1-1.41 0"
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
          fontSize: "22px",
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
          fontSize: "22px",
          flexShrink: 0,
        }}
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1m1-8h-2V7h2z"
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
          fontSize: "22px",
          flexShrink: 0,
        }}
      >
        <path
          fill="currentColor"
          d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3M12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1m1 4h-2v-2h2z"
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
          fontSize: "22px",
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
          fontSize: "22px",
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
          fontSize: "22px",
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
