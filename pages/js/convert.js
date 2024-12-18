const fs = require('fs');
const path = require('path');
const marked = require('marked');  // To parse markdown
const changeCase = require('change-case');  // To handle case insensitivity for poem types

// Folder paths
const mdFolder = 'C:\\Users\\Kris Yotam\\Documents\\Poetry.com\\poems\\md';
const htmlFolder = 'C:\\Users\\Kris Yotam\\Documents\\Poetry.com\\poems\\html';
const cssFolder = 'C:\\Users\\Kris Yotam\\Documents\\Poetry.com\\poems\\css';

// Poem type to CSS file map
const cssFiles = {
    villanelle: 'villanelle.css',
    tanka: 'tanka.css',
    sonnet: 'sonnet.css',
    quatrain: 'quatrain.css',
    poems: 'poems.css',
    ode: 'ode.css',
    narrative: 'narrative.css',
    lune: 'lune.css',
    litanies: 'litanies.css',
    'list-poem': 'list-poem.css',
    limerick: 'limerick.css',
    haiku: 'haiku.css',
    'free-verse': 'free-verse.css',
    elegy: 'elegy.css',
    'concrete-poetry': 'concrete-poetry.css',
    cinquain: 'cinquain.css',
    ballad: 'ballad.css',
    antiphon: 'antiphon.css',
    acrostic: 'acrostic.css'
};

// Function to get poem type from metadata (strip underscores and handle snake_case)
function getPoemType(metadata) {
    const typeMatch = metadata.match(/_([A-Za-z]+)_/);
    if (typeMatch) {
        return changeCase.snakeCase(typeMatch[1].toLowerCase());
    }
    return null;
}

// Function to convert Markdown to HTML and generate the HTML file
function convertMarkdownToHTML() {
    // Read all files from the 'md' folder
    fs.readdirSync(mdFolder).forEach(file => {
        // Only process markdown files
        if (path.extname(file) === '.md') {
            const filePath = path.join(mdFolder, file);
            const fileName = path.basename(file, '.md');
            const htmlFilePath = path.join(htmlFolder, `${fileName}.html`);

            try {
                // Read the Markdown file content
                const content = fs.readFileSync(filePath, 'utf-8');

                // Extract metadata (poem title, type, year)
                const lines = content.split('\n');
                const title = lines[0].replace('# ', '').trim();  // First line as title
                const link = lines[1].replace('## ', '').trim();  // Second line as link
                let metadata = lines[2].trim();  // Type (e.g. "_Sonnet_")
                const year = lines[3].trim();  // Year (e.g. "2024")

                const poemType = getPoemType(metadata);  // Get the poem type BEFORE cleaning metadata
                metadata = metadata.replace(/_/g, '').trim();  // Clean metadata AFTER getting type
                
                const poemCSS = poemType && cssFiles[poemType] ? cssFiles[poemType] : null;  // Get specific poem type CSS, or null if no type

                // Parse the poem content (skip the first 4 lines for metadata)
                const poemContent = content.split('\n').slice(4).join('\n');

                // Convert Markdown to HTML using marked
                const poemHTML = marked(poemContent);

                // Build the full HTML page
                let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/poems/css/poems.css"> <!-- Always include poems.css -->
`;

                // Conditionally add poem-specific CSS if it exists
                if (poemCSS) {
                    htmlContent += `<link rel="stylesheet" href="/poems/css/${poemCSS}">`;
                }

                htmlContent += `
</head>
<body>

    <header class="center">
        <h1><a href="${link}" target="_blank">${title}</a></h1> <!-- Title is the hyperlink -->
        <div class="poem-meta">
            <span>${metadata}</span> ·  <!-- Poem type without underscores -->
            <span>${year}</span>
        </div>
    </header>

    <section>
        <div class="poem-content">
            ${poemHTML}
        </div>
    </section>

    <!-- Back Button -->
    <a href="/index.html" class="back-button">← Back to Poem Types</a>

</body>
</html>
`;

                // Write the HTML content to the 'html' folder
                fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
                console.log(`Successfully converted ${file} to ${htmlFilePath}`);

            } catch (error) {
                console.error(`Error processing ${file}: ${error.message}`);
            }
        }
    });
}

// Check if directories exist before proceeding
try {
    if (!fs.existsSync(mdFolder)) {
        throw new Error('Markdown folder does not exist');
    }
    if (!fs.existsSync(htmlFolder)) {
        throw new Error('HTML output folder does not exist');
    }
    if (!fs.existsSync(cssFolder)) {
        throw new Error('CSS folder does not exist');
    }

    // Execute the conversion process
    convertMarkdownToHTML();

} catch (error) {
    console.error('Directory error:', error.message);
}