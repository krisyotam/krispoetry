// Fetch poem types from the JSON file and display them on the page
document.addEventListener('DOMContentLoaded', function () {
    const poemTypesList = document.getElementById('poem-types-list');

    fetch('/pages/json/poems.json')
        .then(response => response.json())
        .then(data => {
            // Ensure no duplicates and only display unique types
            const uniqueTypes = [...new Set(data.map(poem => poem.type))];

            uniqueTypes.forEach(type => {
                // Find the first poem object with that type
                const poem = data.find(poem => poem.type === type);

                // Create a link for each poem type with a link to the poem type page
                const poemTypeLink = document.createElement('a');
                poemTypeLink.href = poem.type_link; // Link to the poem type category page
                poemTypeLink.classList.add('poem-type');
                poemTypeLink.textContent = poem.type; // Only display the poem type (e.g., "Sonnet", "Free Verse")

                // Append the link to the poem types list
                poemTypesList.appendChild(poemTypeLink);
            });
        })
        .catch(error => console.error('Error loading poem types:', error));
});
