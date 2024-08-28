export interface AnimationOject {
    initial: GSAPTweenVars;
    enter: GSAPTweenVars;
    leave: GSAPTweenVars;
}

export interface DictAnimation {
    [key: string]: AnimationOject;
}

export const gsapAnimations: DictAnimation = {
    scale: {
        initial: { opacity: 0, scale: 0.9 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0.9 },
    },
    fadeIn: {
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    },
    dropIn: {
        initial: { y: '-100vh', opacity: 0 },
        enter: { y: '0', opacity: 1 },
        leave: { y: '-100vh', opacity: 0 },
    },
    flip: {
        initial: { scale: 0, rotateX: '-360deg', opacity: 0 },
        enter: { scale: 1, rotateX: '0deg', opacity: 1 },
        leave: { scale: 0, rotateX: '-360deg', opacity: 0 },
    },
    newspaper: {
        initial: { scale: 0, rotate: '720deg', opacity: 0 },
        enter: { scale: 1, rotate: '0deg', opacity: 1 },
        leave: { scale: 0, rotate: '-720deg', opacity: 0 },
    },
};
