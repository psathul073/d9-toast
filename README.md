# D9-Toast

Customizable toast notifications for React.


**Features:**

* Lightweight and fully customizable toast notifications.  
* Built with React.  
* Pure CSS included — no additional setup required.  
* Easy to import and use in any React project.  
* Supports multiple types: success, error, info, warning, loading, submit.  
* Fully responsive and modern UI and smooth animation.  
* Users can optionally add Tailwind CSS classes via `className` for custom styling.

---

## Demo

[Click Here](https://codesandbox.io/embed/cqkyzm?view=preview&module=%2Fpublic%2Findex.html)

## Installation

```bash
npm install d9-toast
```

or

```bash
yarn add d9-toast
```

---

## Usage

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

### 2. Trigger a toast using `useToast`

```jsx
import React from "react";
import { useToast } from "d9-toast";

function App() {

  const { showToast, removeToast, removeToastAll } = useToast();

  const Toast = () => {
    showToast({
      message: "Hello World!",
      type: "success", // success | error | info | warning | loading | submit
      position: "top-right",
      duration: 3000,
      actions: [
        { text: "Toast ID", callback: (toastId) => console.log(toastId) },
        { text: "Submit", callback: () => console.log("Submit clicked") },
      ], 
      className: "bg-green-500 text-white shadow-lg", // optional Tailwind/custom styling
    });
  };

  return <button onClick={Toast}>Show Toast</button>;
}

export default App;
```

### 3. Toast Options

| Option     | Type    | Default | Description                                                                |
| ---------- | ------- | ------- | -------------------------------------------------------------------------- |
| `message`  | string  | -       | Main message text of the toast                                                     |
| `type`     | string  | `info`  | Type of toast (`success`, `error`, `info`, `warning`, `loading`, `submit`) |
| `duration` | number  | 5000    | Auto-close duration in ms (0 for infinite)                                 |
| `position`         | string  | `top-right` | Position of all toasts (`top-left`, `top-right`, `bottom-left`, `bottom-right`, `center`, `center-top`, `center-bottom` ) |
| `theme`            | string  | `light`     | Default theme for all toasts (`light` or `dark`)                                |
| `pauseOnHover`     | boolean | `true`      | Pause timer when hovered                                                      |
| `pauseOnFocusLoss` | boolean | `true`      | Pause timer when window/tab loses focus                                       |
| `actions`  | array   | []      | Array of action objects `{ text: string, callback: function }`             |
| `closable` | boolean | true    | Allow manual close via X button
| `autoClose` | boolean | true    | Whether the toast auto-closes after duration button                                                           |
| `progress` | boolean | true    | Whether to show progress bar                                                          |
| `className` | string| " "   | Optional extra CSS/Tailwind classes to customize the toast bar                                                          |

---

## Development

### Build

```bash
npm run build
```

* Copies JS to `dist/`
* Copies CSS `(toast.css)` to `dist/`

### Styling

* Default styling is included in dist/toast.css
* Users can optionally override or extend styles using className

```jsx
import "d9-toast/dist/toast.css";
```
* Tailwind CSS is optional — you can pass Tailwind classes via className.
---

## License

MIT
