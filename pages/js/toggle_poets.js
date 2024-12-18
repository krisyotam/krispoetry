document.addEventListener("DOMContentLoaded", () => {
    // Select all category titles (expandable sections)
    const categories = document.querySelectorAll('.category-title');

    categories.forEach((category) => {
        category.addEventListener('click', () => {
            const content = category.nextElementSibling; // Find the corresponding content section
            const isOpen = content.classList.contains('open');

            // Toggle the "open" class to handle max-height and padding transitions
            if (isOpen) {
                content.classList.remove('open');
                category.classList.remove('open');
            } else {
                content.classList.add('open');
                category.classList.add('open');
            }
        });
    });
});
