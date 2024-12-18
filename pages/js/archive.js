document.addEventListener("DOMContentLoaded", async () => {
    const archiveSection = document.querySelector(".archive");

    try {
        // Fetch the JSON data for poems
        const response = await fetch("/pages/json/poems.json");
        const poemsData = await response.json();

        // Extract the years
        const years = [...new Set(poemsData.map(poem => poem.exact_date.split('-')[0]))];

        // For each year, create a flap section
        years.forEach(year => {
            const yearFlap = document.createElement("div");
            yearFlap.classList.add("year-flap");
            yearFlap.setAttribute("id", `year-${year}`); // Add a unique ID for each year

            // Create the title for the year flap
            const yearTitle = document.createElement("h2");
            yearTitle.classList.add("year-title");
            yearTitle.textContent = `Poems of ${year}`;
            yearFlap.appendChild(yearTitle);

            // Toggle visibility for year when clicked
            yearTitle.addEventListener("click", () => {
                yearFlap.classList.toggle("expanded");
            });

            // Get the months in this year and group poems by month
            const months = [...new Set(poemsData.filter(poem => poem.exact_date.startsWith(year)).map(poem => poem.exact_date.split('-')[1]))];

            months.forEach(month => {
                const monthFlap = document.createElement("div");
                monthFlap.classList.add("month-flap");
                monthFlap.setAttribute("id", `month-${year}-${month}`); // Unique ID for each month

                // Create the title for the month flap
                const monthTitle = document.createElement("h3");
                monthTitle.classList.add("month-title");

                // Adjust month index for proper month name (0-indexed)
                const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });
                monthTitle.textContent = monthName;
                monthFlap.appendChild(monthTitle);

                // Toggle visibility for month when clicked
                monthTitle.addEventListener("click", () => {
                    monthFlap.classList.toggle("expanded");
                });

                // Create the list of poems for this month
                const poemList = document.createElement("ul");
                poemList.classList.add("poem-list");

                poemsData.filter(poem => poem.exact_date.startsWith(`${year}-${month}`)).forEach(poem => {
                    const poemItem = document.createElement("li");
                    poemItem.classList.add("poem-item");

                    // Create a span for the poem's title, type, and date
                    const poemText = document.createElement("span");
                    poemText.classList.add("poem-text");

                    // Format date as "Month Day, Year"
                    const formattedDate = new Date(poem.exact_date).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' });

                    // Format the poem entry
                    poemText.textContent = `${poem.name} (${poem.type}) ${formattedDate}`;

                    // Create a link to the poem
                    const readPoemLink = document.createElement("a");
                    readPoemLink.classList.add("read-poem-link");
                    readPoemLink.href = poem.poem_link;
                    readPoemLink.textContent = "Read Poem";

                    poemItem.appendChild(poemText);
                    poemItem.appendChild(readPoemLink);
                    poemList.appendChild(poemItem);
                });

                monthFlap.appendChild(poemList);
                yearFlap.appendChild(monthFlap);
            });

            // Append the year flap to the archive section
            archiveSection.appendChild(yearFlap);
        });
    } catch (error) {
        console.error("Error fetching or processing poems data:", error);
    }
});
