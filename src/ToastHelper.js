
// For animation direction.
export const getAnimationDirection = (position) => {
    if (position.startsWith("top")) return "top";
    if (position.startsWith("bottom")) return "bottom";
    if (position === "center") return "center";
    if (position === "center-top") return "top";
    if (position === "center-bottom") return "bottom";
    return "top";
};

const SWIPE_THRESHOLD = 20; // px

export const isSwipeAllowed = (position, dx, dy) => {
    if (position.startsWith("top")) {
        return dy < -SWIPE_THRESHOLD; // swipe up.
    }

    if (position.startsWith("bottom")) {
        return dy > SWIPE_THRESHOLD; // swipe down.
    }

    if (position.startsWith("center")) {
        return Math.abs(dy) > SWIPE_THRESHOLD;
    }

    return false;
};
