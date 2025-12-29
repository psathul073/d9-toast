# D9-Toast

![npm version](https://img.shields.io/npm/v/d9-toast?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/d9-toast?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/d9-toast?style=flat-square)
![License](https://img.shields.io/npm/l/d9-toast?style=flat-square)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
[![Donate via Razorpay](https://img.shields.io/badge/Donate-Razorpay-blue)](https://rzp.io/rzp/eVnJ0oP)

A lightweight, customizable toast notification library for React applications.

## ✨ Features

- **Lightweight & Customizable** – Minimal bundle size with extensive customization options
- **React Native** – Built specifically for React with hooks support
- **No External Dependencies** – Pure CSS included, works out of the box
- **Multiple Toast Types** – Success, error, info, warning, loading, and submit states
- **Responsive Design** – Modern UI with smooth animations across all devices
- **Tailwind CSS Compatible** – Optional custom styling via `className` prop
- **Flexible Positioning** – 7 different display positions
- **Theme Support** – Light, dark, and colored themes

## 📺 Demo

[![Live Demo](https://img.shields.io/badge/Live_Demo-CodeSandbox-000000?style=for-the-badge&logo=codesandbox&logoColor=white)](https://codesandbox.io/embed/cqkyzm?view=preview&module=%2Fpublic%2Findex.html)

## 📦 Installation

```bash
npm install d9-toast
```

or

```bash
yarn add d9-toast
```

## 🚀 Quick Start

### 1. Wrap your app with `ToastProvider`

```jsx
import React from "react";
import { ToastProvider } from "d9-toast";
import App from "./App";

function Root() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}

export default Root;
```

### 2. Use toast notifications anywhere

```jsx
import React from "react";
import { useToast } from "d9-toast";

function MyComponent() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast({
      message: "Operation completed successfully!",
      type: "success",
      position: "top-right",
      duration: 3000,
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

## 📖 API Reference

### `useToast()`

Returns an object with toast management methods:

| Method               | Description                       |
| -------------------- | --------------------------------- |
| `showToast(options)` | Displays a new toast notification |
| `removeToast(id)`    | Removes a specific toast by ID    |
| `removeToastAll()`   | Removes all active toasts         |

### Toast Options

| Option             | Type                      | Default       | Description                                                                                               |
| ------------------ | ------------------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| `message`          | string \| React.ReactNode | **Required**  | Toast content (supports JSX)                                                                              |
| `type`             | string                    | `"success"`   | Toast type: `success`, `error`, `info`, `warning`, `loading`, `submit`                                    |
| `position`         | string                    | `"top-right"` | Position: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `center`, `center-top`, `center-bottom` |
| `theme`            | string                    | `"light"`     | Theme: `light`, `dark`, `colored`                                                                         |
| `duration`         | number                    | `5000`        | Auto-close duration in ms (0 = infinite)                                                                  |
| `autoClose`        | boolean                   | `true`        | Whether toast auto-closes after duration                                                                  |
| `closable`         | boolean                   | `false`       | Show close (X) button                                                                                     |
| `pauseOnHover`     | boolean                   | `true`        | Pause timer on hover                                                                                      |
| `pauseOnFocusLoss` | boolean                   | `true`        | Pause timer when window loses focus                                                                       |
| `progress`         | boolean                   | `true`        | Show progress bar                                                                                         |
| `title`            | boolean                   | `true`        | Show toast header with type                                                                               |
| `actions`          | Array                     | `[]`          | Action buttons: `[{ text: string, className: string, callback: function }]`                               |
| `className`        | string                    | `""`          | Additional CSS/Tailwind classes[Use !important with Tailwind]                                             |

## 💡 Advanced Usage

### Custom Messages with JSX

```jsx
showToast({
  message: (
    <div>
      <strong>Custom Content</strong>
      <p>With formatted HTML/JSX</p>
    </div>
  ),
  type: "info",
});
```

### Action Buttons

```jsx
showToast({
  message: "File uploaded successfully",
  type: "success",
  actions: [
    {
      text: "View",
      className: "!bg-gray-600 !text-white",
      callback: () => console.log("View clicked"),
    },
    {
      text: "Dismiss",
      className: "!bg-gray-600/20 !text-white",
      callback: ({ id }) => removeToast(id),
    },
  ],
});
```

### Manual Control

```jsx
const { showToast, removeToast, removeToastAll } = useToast();

// Show a persistent toast
const toastId = showToast({
  message: "Processing...",
  type: "loading",
  duration: 0, // Infinite
});

// Remove it later
removeToast(toastId);

// Clear all toasts
removeToastAll();
```

## 🎨 Styling

### Default CSS

```jsx
import "d9-toast/dist/toast.css";
```

### Custom Styling

```jsx
// optional Tailwind/custom styling [Use !important with Tailwind (className: "!bg-red-500")]
showToast({
  message: "Custom styled toast",
  className:
    "bg-gradient-to-r from-gray-800 to-gray-600 !text-white !shadow-xl !rounded-lg",
  type: "success",
});
```

### Theme Examples

```jsx
// Light theme (default)
showToast({ message: "Light", theme: "light" });

// Dark theme
showToast({ message: "Dark", theme: "dark" });

// Colored theme (uses type for color)
showToast({
  message: "Colored",
  theme: "colored",
  type: "success",
});
```

## 🔧 Development

### Build

```bash
npm run build
```

Outputs to `dist/` directory:

- `dist/index.js` – JavaScript bundle
- `dist/toast.css` – Default styles

### Local Development

```bash
npm start
# or
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Athul / D9 Coder]

---

## 🙏 Acknowledgments

- Inspired by popular notification libraries
- Built with React and modern web standards
- Thanks to all contributors and users

---

## ❤️ Support My Work

Donate here → https://rzp.io/rzp/eVnJ0oP

[![Donate via Razorpay](https://img.shields.io/badge/Donate-Razorpay-blue)](https://rzp.io/rzp/eVnJ0oP)

---

**Quick Links:**

- [Report an Issue](https://github.com/psathul073/d9-toast/issues)
- [View Source](https://github.com/psathul073/d9-toast)
- [npm Package](https://www.npmjs.com/package/d9-toast)
