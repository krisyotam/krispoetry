// Fetch poems from the JSON file and insert them dynamically into the webpage
fetch('/pages/json/poems.json')
    .then(response => {
        // Ensure the response is OK before proceeding
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(poems => {
        const poemList = document.getElementById('poem-list');

        if (!poemList) {
            console.error('Poem list container not found!');
            return;
        }

        poems.forEach(poem => {
            // Validate the poem's links
            if (!poem.poem_link || typeof poem.poem_link !== 'string') {
                console.warn(`Skipping poem "${poem.name}" due to missing or invalid poem link.`);
                return;
            }

            if (!poem.type_link || typeof poem.type_link !== 'string') {
                console.warn(`Skipping poem "${poem.name}" due to missing or invalid type link.`);
                return;
            }

            // Ensure that the links start with a valid prefix or are valid paths
            const validPoemLink = poem.poem_link.startsWith('/') ? poem.poem_link : `/${poem.poem_link}`;
            const validTypeLink = poem.type_link.startsWith('/') ? poem.type_link : `/${poem.type_link}`;

            // Create the poem element
            const poemElement = document.createElement('a');
            poemElement.href = validPoemLink; // Set the href to the validated poem link
            poemElement.classList.add('poem');

            // Create the title element
            const poemTitle = document.createElement('h2');
            poemTitle.textContent = poem.name;
            poemElement.appendChild(poemTitle);

            // Create the metadata element
            const poemMeta = document.createElement('div');
            poemMeta.classList.add('poem-meta');

            // Add the date
            const poemDate = document.createElement('span');
            poemDate.textContent = poem.date;
            poemMeta.appendChild(poemDate);

            // Add the separator
            const separator = document.createElement('span');
            separator.textContent = ' · ';
            poemMeta.appendChild(separator);

            // Add the type with a link
            const poemType = document.createElement('a');
            poemType.href = validTypeLink;
            poemType.textContent = poem.type;
            poemMeta.appendChild(poemType);

            // Append the metadata to the poem element
            poemElement.appendChild(poemMeta);

            // Append the poem element to the poem list
            poemList.appendChild(poemElement);
        });
    })
    .catch(error => {
        console.error('Error loading poems:', error);
    });
