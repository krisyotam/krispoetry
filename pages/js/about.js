// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Get all flaps on the page
    const aboutFlaps = document.querySelectorAll('.about-flap');

    // Add click event listener to each flap
    aboutFlaps.forEach(flap => {
        flap.addEventListener('click', function() {
            // Toggle the 'expanded' class on the clicked flap to show or hide the content
            this.classList.toggle('expanded');
        });
    });
});
