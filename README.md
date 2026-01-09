# D9-Toast

![npm version](https://img.shields.io/npm/v/d9-toast?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/d9-toast?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/d9-toast?style=flat-square)
![License](https://img.shields.io/npm/l/d9-toast?style=flat-square)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square\&logo=react\&logoColor=black)
[![Donate via Razorpay](https://img.shields.io/badge/Donate-Razorpay-blue)](https://rzp.io/rzp/eVnJ0oP)

A **lightweight, fully typed, customizable toast notification library** for React applications.

---

## ✨ Features

* ⚡ **Lightweight & Fast** – Minimal bundle size
* 🔒 **100% TypeScript Support** – Strongly typed API
* 🎨 **Themes** – Light, Dark & Colored
* 🔔 **Audio Support** – Custom toast sounds with cooldown
* 🎯 **Multiple Positions** – 7 flexible placements
* 🧩 **Action Buttons** – Custom actions per toast
* ⏱ **Auto / Manual Control**
* 🧪 **No External Dependencies**
* 🎭 **Tailwind Compatible**
* 📱 **Responsive & Animated UI**

---

## 📺 Demo

[![Live Demo](https://img.shields.io/badge/Live_Demo-CodeSandbox-000000?style=for-the-badge\&logo=codesandbox\&logoColor=white)](https://psathul073.github.io/d9-toast-docs/docs/examples/basic)

---

## 📦 Installation

```bash
npm install d9-toast
```

or

```bash
yarn add d9-toast
```

---

## 🚀 Quick Start

### 1. Wrap your app with `ToastProvider`

```jsx
import { ToastProvider } from "d9-toast";
import "d9-toast/toast.css"; // Import the default styles once in your app.


export default function Root() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}
```

---

### 2. Trigger toasts anywhere

```jsx
import { useToast } from "d9-toast";

function MyComponent() {
  const { showToast } = useToast();

  return (
    <button
      onClick={() =>
        showToast({
          message: "Saved successfully!",
          type: "success",
        })
      }
    >
      Show Toast
    </button>
  );
}
```

---

## 📖 API Reference

### `useToast()`

```ts
const { sounds, showToast, removeToast, removeToastAll } = useToast();
```

| Method               | Description                       |
| -------------------- | --------------------------------- |
| `sounds`             | Available toast sounds  `"success" \| "error" \| "info" \| "warning"` |
| `showToast(options)` | Show a toast and returns its `id` |
| `removeToast(id)`    | Remove toast by ID                |
| `removeToastAll()`   | Clear all toasts                  |

---

## 🔧 Toast Options

### Core Options

| Option             | Type                                                                                                          | Description                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `message`          | `string \| ReactNode`                                                                                         | **Required** content               |
| `type`             | `"success" \| "error" \| "info" \| "warning" \| "loading" \| "submit"`                                        | Visual type                        |
| `theme`            | `"light" \| "dark" \| "colored"`                                                                              | Theme variant                      |
| `position`         | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "center" \| "center-top" \| "center-bottom"` | Toast placement                    |
| `duration`         | `number`                                                                                                      | Auto-close duration (0 = infinite) |
| `autoClose`        | `boolean`                                                                                                     | Enable auto close                  |
| `closable`         | `boolean`                                                                                                     | Show close (X) button              |
| `progress`         | `boolean`                                                                                                     | Show progress bar                  |
| `title`            | `boolean`                                                                                                     | Show header/title                  |
| `pauseOnHover`     | `boolean`                                                                                                     | Pause on hover                     |
| `pauseOnFocusLoss` | `boolean`                                                                                                     | Pause on tab switch                |
| `className`        | `string`                                                                                                      | Custom styles                      |

---

### 🔘 Actions

```ts
actions?: {
  text: string;
  className?: string;
  callback?: (toast: { id: number }) => void;
}[];
```

**Example**

```jsx

showToast({
  message: "File uploaded",
  actions: [
    {
      text: "Undo",
      callback: ({ id }) => removeToast(id),
    },
  ],
});
```

---

## 🔊 Audio Support (NEW)

### Audio Options

```ts
audio?: {
  enabled?: boolean;
  volume?: number; // 0 – 1
  audioFile?: string;
  cooldown?: number; // ms
};
```

### Example

  ```jsx
  const { sounds, showToast } = useToast();

  showToast({
    message: "Message sent",
    type: "success",
    audio: {
      enabled: true,
      volume: 0.8,
      cooldown: 500,
      audioFile: sounds.success,
    },
  });
  ```

  ✔ Prevents sound spam
  ✔ Per-toast control
  ✔ Custom audio file supported

---

## 🎨 Styling

## Styles (Required)
Import the default styles once in your app:

```js
import "d9-toast/toast.css";
```

### Tailwind / Custom Styling

```jsx
showToast({
  message: "Styled Toast",
  className:
    "!bg-gradient-to-r from-indigo-600 to-purple-600 !text-white !rounded-xl",
});
```

> ⚠️ Use `!important` when overriding styles with Tailwind

---

## 🧠 Advanced Usage

### Persistent Toast

```jsx
const id = showToast({
  message: "Loading...",
  type: "loading",
  duration: 0,
});

// later
removeToast(id);
```

---

### JSX Content

```jsx
showToast({
  message: (
    <>
      <strong>Custom JSX</strong>
      <p>This supports React nodes</p>
    </>
  ),
});
```

---

## 🧾 TypeScript Support

D9-Toast ships with **full TypeScript definitions**:

```ts
import type { ToastOptions, ToastType } from "d9-toast";
```

✔ IntelliSense
✔ Strict typing
✔ No `any`

---

## 📄 License

MIT © **Athul / D9 Coder**

---

## ❤️ Support My Work

👉 [https://rzp.io/rzp/eVnJ0oP](https://rzp.io/rzp/eVnJ0oP)

---

## 🔗 Links

* 🐞 [Report Issue](https://github.com/psathul073/d9-toast/issues)
* 💻 [Source Code](https://github.com/psathul073/d9-toast)
* 📦 [npm Package](https://www.npmjs.com/package/d9-toast)
