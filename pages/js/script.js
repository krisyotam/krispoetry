// Custom smooth scrolling function
function smoothScrollTo(target, duration) {
    const start = window.scrollY || window.pageYOffset;
    const targetElement = document.querySelector(target);
    if (!targetElement) return; // If no target element is found, exit

    const targetPosition = targetElement.getBoundingClientRect().top + start;
    const distance = targetPosition - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);

        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Ease function for a smooth deceleration effect
    function ease(t, b, c, d) {
        // Ease-in-out quadratic easing function
        return c * (t /= d) * (t - 2) + b;
    }

    requestAnimationFrame(animation);
}

// Attach the custom smooth scroll to the links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // If it's an internal link, apply custom smooth scroll
        if (href.startsWith("#")) {
            e.preventDefault();
            smoothScrollTo(href, 1000); // 1000ms duration for the scroll
        }
    });
});

