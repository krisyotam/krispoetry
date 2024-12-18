document.addEventListener("DOMContentLoaded", async () => {
    const poemUpdatesSection = document.querySelector(".poem-updates tbody");
    
    try {
        // Fetch the JSON data for poems
        const response = await fetch("/pages/json/poems.json");
        const poemsData = await response.json();

        // Get the current date and calculate the start and end of the current week
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Start of current week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Saturday)

        // Format dates to 'YYYY-MM-DD' for comparison
        const formatDate = (date) => {
            return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        };

        const startOfWeekFormatted = formatDate(startOfWeek);
        const endOfWeekFormatted = formatDate(endOfWeek);

        // Filter poems based on 'date_added' being within the current week
        const recentPoems = poemsData.filter(poem => {
            const poemDateAdded = poem.date_added;
            return poemDateAdded >= startOfWeekFormatted && poemDateAdded <= endOfWeekFormatted;
        });

        // Add filtered poems to the Poem Updates section
        recentPoems.forEach(poem => {
            const row = document.createElement("tr");

            // Poem Title
            const poemTitleCell = document.createElement("td");
            poemTitleCell.textContent = poem.name;
            row.appendChild(poemTitleCell);

            // Poem Date Added
            const poemDateCell = document.createElement("td");
            const formattedDateAdded = new Date(poem.date_added).toLocaleDateString();
            poemDateCell.textContent = formattedDateAdded;
            row.appendChild(poemDateCell);

            poemUpdatesSection.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching or processing poems data:", error);
    }
});
