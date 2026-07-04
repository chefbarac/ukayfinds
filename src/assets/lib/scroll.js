function throttleScroll(callback) {
    let ticking = false;
    return function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                callback();
                ticking = false;
            });
            ticking = true;
        }
    };
}

export { throttleScroll }