# D9-Toast

![npm version](https://img.shields.io/npm/v/d9-toast?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/d9-toast?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/d9-toast?style=flat-square)
![License](https://img.shields.io/npm/l/d9-toast?style=flat-square)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square\&logo=react\&logoColor=black)
[![Donate via Razorpay](https://img.shields.io/badge/Donate-Razorpay-blue)](https://rzp.io/rzp/eVnJ0oP)

A **lightweight, fully typed, production-ready toast notification library** for React — with **zero hooks required**.

---

## ✨ Features

* ⚡ **Lightweight & Fast** – Minimal bundle size
* 🔒 **100% TypeScript** – Full IntelliSense & strict typing
* 🎨 **Themes** – Light, Dark & Colored
* 🔔 **Audio Support** – Per-toast sounds with cooldown
* 🎯 **7 Positions** – Flexible placement
* 🧩 **Action Buttons** – Undo / Retry / CTA actions
* ⏱ **Auto / Manual Control**
* 🔄 **Promise Toasts** – Loading → Success / Error
* 📚 **Stack Depth Animations**
* 🔁 **Expand on Hover**
* 🔠 **RTL Text Support**
* 🧪 **No External Dependencies**
* 📱 **Responsive & Accessible**

---

## 📺 Demo

👉 [https://psathul073.github.io/d9-toast-docs/docs/examples/basic](https://psathul073.github.io/d9-toast-docs/docs/examples/basic)

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

### 1️⃣ Wrap your app with `ToastProvider`

```jsx
import { ToastProvider } from "d9-toast";
import "d9-toast/toast.css";

export default function Root() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}
```

> ⚠️ Required **once** at app root

---

### 2️⃣ Trigger toasts anywhere (NO HOOKS)

```jsx
import { toast } from "d9-toast";

// You can call it directly!
const notify = () => toast("Simple notification");

// Or use specific types
const success = () => toast.success("Saved!");
```

✅ Works inside

* components
* utils
* services
* async functions

---

## 📖 Toast API

```ts
import { toast } from "d9-toast";
```

### Available Methods

| Method                                      | Description         |
| ------------------------------------------- | ------------------- |
| `toast(msg, options)`                       | Show default toast  |
| `toast.success(msg, options)`               | Show success toast  |
| `toast.error(msg, options)`                 | Show error toast    |
| `toast.info(msg, options)`                  | Show info toast     |
| `toast.warning(msg, options)`               | Show warning toast  |
| `toast.promise(promise, messages, options)` | Promise-based toast |
| `toast.dismiss(id)`                         | Remove toast        |
| `toast.dismissAll()`                        | Clear all toasts    |

---

## 🔧 Toast Options

### Core Options

| Option             | Type                                                                                               | Description                 |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------------- |
| `message`          | `string \| ReactNode`                                                                              | Toast content               |
| `type`             | `"success" \| "error" \| "info" \| "warning" \| "loading" \| "submit"`                             | Visual type                 |
| `theme`            | `"light" \| "dark" \| "colored"`                                                                   | Theme                       |
| `position`         | `"top-right" \| top-left \| bottom-right \| bottom-left \| center \| center-top \| center-bottom"` | Placement                   |
| `duration`         | `number`                                                                                           | Auto close (0 = persistent) |
| `autoClose`        | `boolean`                                                                                          | Enable auto close           |
| `closable`         | `boolean`                                                                                          | Show close button           |
| `progress`         | `boolean`                                                                                          | Progress bar                |
| `title`            | `boolean`                                                                                          | Header/title                |
| `pauseOnHover`     | `boolean`                                                                                          | Pause on hover              |
| `pauseOnFocusLoss` | `boolean`                                                                                          | Pause on tab switch         |
| `rtl`              | `boolean`                                                                                          | RTL text support            |
| `expand`           | `boolean \| "hover"`                                                                               | Expand stacked toasts       |
| `className`        | `string`                                                                                           | Custom styles               |

---

## 🔘 Action Buttons

```ts
actions?: {
  text: string;
  className?: string;
  callback?: (toast: { id: string }) => void;
}[];
```

### Example

```jsx
toast.success("File uploaded", {
  actions: [
    {
      text: "Undo",
      callback: ({ id }) => toast.dismiss(id),
    },
  ],
});
```

---

## 🔄 Promise Toasts (NEW)

```jsx
toast.promise(
  fetch("/api/save"),
  {
    loading: "Saving...",
    success: "Saved successfully!",
    error: "Failed to save",
  }
);
```

✔ Auto loading
✔ Auto update
✔ Returns original promise

---

## 🔊 Audio Support

### Audio Options

```ts
audio?: {
  enabled?: boolean;
  volume?: number; // 0–1
  audioFile?: string;
  cooldown?: number; // ms
};
```

### Example

```jsx
toast.success("Message sent", {
  audio: {
    enabled: true,
    volume: 0.8,
    audioFile: toast.sounds.success,
  },
});
```

✔ Per-toast control
✔ Cooldown prevents spam
✔ Custom sound support

---

## 🎨 Styling

### Required

```js
import "d9-toast/toast.css";
```

### Tailwind Example

```jsx
toast.success("Styled Toast", {
  className:
    "!bg-gradient-to-r from-indigo-600 to-purple-600 !text-white !rounded-xl",
});
```

> ⚠️ Use `!important` for Tailwind overrides

---

## 🧠 Advanced

### Persistent Toast

```jsx
const id = toast.info("Processing...", { duration: 0 });

// later
toast.dismiss(id);
```

---

### JSX Content

```jsx
toast.info(
  <div>
    <strong>Custom JSX</strong>
    <p>Supports React nodes</p>
  </div>
);
```

---

## 🧾 TypeScript Support

```ts
import type { ToastOptions, ToastType } from "d9-toast";
```

✔ Full IntelliSense
✔ Strict typing
✔ Zero `any`

---

## 📄 License

MIT © **Athul / D9 Coder**

---

## ❤️ Support My Work

👉 [https://rzp.io/rzp/eVnJ0oP](https://rzp.io/rzp/eVnJ0oP)

---

## 🔗 Links

* 🐞 Issues: [https://github.com/psathul073/d9-toast/issues](https://github.com/psathul073/d9-toast/issues)
* 💻 Source: [https://github.com/psathul073/d9-toast](https://github.com/psathul073/d9-toast)
* 📦 npm: [https://www.npmjs.com/package/d9-toast](https://www.npmjs.com/package/d9-toast)

---

> See [CHANGELOG](https://psathul073.github.io/d9-toast-docs/docs/Changelog) for details.
