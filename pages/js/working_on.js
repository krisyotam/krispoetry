document.addEventListener("DOMContentLoaded", async () => {
    const workingOnSection = document.querySelector(".working-on tbody");

    try {
        // Fetch the working_on.json data
        const response = await fetch("/pages/json/working_on.json");
        const projectsData = await response.json();

        // Get the current date and the date one month ago
        const currentDate = new Date();
        const oneMonthAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

        // Filter the projects to only include completed ones from the last month or ongoing projects
        const filteredProjects = projectsData.filter(project => {
            // If the project is ongoing (no finished date)
            if (!project.date_finished) {
                return true;
            }

            // If the project is finished and was completed in the last month
            const finishedDate = new Date(project.date_finished);
            return finishedDate >= oneMonthAgo;
        });

        // Insert the filtered projects into the table
        filteredProjects.forEach(project => {
            const row = document.createElement("tr");

            const projectCell = document.createElement("td");
            projectCell.textContent = project.project;
            row.appendChild(projectCell);

            const dateStartedCell = document.createElement("td");
            dateStartedCell.textContent = project.date_started;
            row.appendChild(dateStartedCell);

            const dateFinishedCell = document.createElement("td");
            dateFinishedCell.textContent = project.date_finished || "Ongoing";
            row.appendChild(dateFinishedCell);

            workingOnSection.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching or processing working_on data:", error);
    }
});
