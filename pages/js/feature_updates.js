document.addEventListener("DOMContentLoaded", async () => {
    const siteFeatureUpdatesTable = document.querySelector(".site-feature-updates tbody");

    try {
        // Fetch the feature updates JSON data
        const response = await fetch("/pages/json/feature_updates.json"); // Update this with the correct path
        const featureUpdatesData = await response.json();

        // Get the current date and calculate the start of the current week
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Get Sunday of this week

        // Loop through the feature updates and add those that are within the current week
        featureUpdatesData.forEach(feature => {
            const featureDate = new Date(feature.date_added);

            // Check if the feature's date is within the current week
            if (featureDate >= startOfWeek) {
                // Create a new table row
                const tableRow = document.createElement("tr");

                // Create the feature name cell
                const featureNameCell = document.createElement("td");
                featureNameCell.textContent = feature.feature;

                // Create the date added cell
                const dateAddedCell = document.createElement("td");
                dateAddedCell.textContent = featureDate.toLocaleDateString('en-US');

                // Append the cells to the row
                tableRow.appendChild(featureNameCell);
                tableRow.appendChild(dateAddedCell);

                // Append the row to the table
                siteFeatureUpdatesTable.appendChild(tableRow);
            }
        });
    } catch (error) {
        console.error("Error fetching or processing feature updates data:", error);
    }
});
