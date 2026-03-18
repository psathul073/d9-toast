import { ToastPosition } from "./types";

type AnimationDirection = "top" | "bottom" | "center";

export const getAnimationDirection = (
  position: ToastPosition,
): AnimationDirection => {
  if (position.startsWith("top")) return "top";
  if (position.startsWith("bottom")) return "bottom";

  if (position === "center") return "center";
  if (position === "center-top") return "top";
  if (position === "center-bottom") return "bottom";

  return "top";
};

const SWIPE_THRESHOLD = 20;

export const isSwipeAllowed = (
  position: ToastPosition,
  dx: number,
  dy: number,
): boolean => {
  if (Math.abs(dy) < Math.abs(dx)) return false;

  if (position.startsWith("top")) return dy < -SWIPE_THRESHOLD;
  if (position.startsWith("bottom")) return dy > SWIPE_THRESHOLD;
  if (position.startsWith("center")) return Math.abs(dy) > SWIPE_THRESHOLD;

  return false;
};
