document.addEventListener("DOMContentLoaded", async () => {
    const professionalsSection = document.querySelector("#professional-section .category-content");
    const hobbyistsSection = document.querySelector("#hobbyist-section .category-content");

    // Clear any existing content before adding new content to avoid duplicates
    professionalsSection.innerHTML = '';
    hobbyistsSection.innerHTML = '';

    try {
        // Fetch the JSON data with cache-busting (to ensure it's not coming from the cache)
        const response = await fetch("/pages/json/poets.json?v=" + new Date().getTime());
        const poetsData = await response.json();

        console.log('Poets data:', poetsData);  // Log to ensure we're receiving the correct data

        // Populate professionals
        poetsData.professionals.forEach((poet) => {
            const poetBlock = createPoetBlock(poet);
            professionalsSection.appendChild(poetBlock);
        });

        // Populate hobbyists
        poetsData.hobbyists.forEach((poet) => {
            const poetBlock = createPoetBlock(poet);
            hobbyistsSection.appendChild(poetBlock);
        });
    } catch (error) {
        console.error("Error fetching or processing poets data:", error);
    }
});

/**
 * Create a poet block DOM element
 * @param {Object} poet - Poet data
 * @returns {HTMLElement} - Poet block
 */
function createPoetBlock(poet) {
    // Create container
    const poetDiv = document.createElement("div");
    poetDiv.classList.add("poet");

    // Create name
    const poetName = document.createElement("h4");
    poetName.textContent = poet.name;

    // Create description
    const poetDescription = document.createElement("p");
    poetDescription.classList.add("poet-description");
    poetDescription.textContent = poet.description;

    // Create link
    const poetMeta = document.createElement("p");
    poetMeta.classList.add("poet-meta");

    const poetLink = document.createElement("a");
    poetLink.href = poet.link;
    poetLink.textContent = "View More";

    poetMeta.appendChild(poetLink);

    // Append all elements to the container
    poetDiv.appendChild(poetName);
    poetDiv.appendChild(poetDescription);
    poetDiv.appendChild(poetMeta);

    return poetDiv;
}
