// expansion.js

document.addEventListener("DOMContentLoaded", () => {
    // Handle year flap expansion
    const yearTitles = document.querySelectorAll(".year-title");
    yearTitles.forEach(yearTitle => {
        yearTitle.addEventListener("click", () => {
            const yearFlap = yearTitle.closest(".year-flap");
            // Toggle expanded class to show or hide the content
            yearFlap.classList.toggle("expanded");
        });
    });

    // Handle month flap expansion
    const monthTitles = document.querySelectorAll(".month-title");
    monthTitles.forEach(monthTitle => {
        monthTitle.addEventListener("click", () => {
            const monthFlap = monthTitle.closest(".month-flap");
            // Toggle expanded class to show or hide the poems under the month
            monthFlap.classList.toggle("expanded");
        });
    });
});
