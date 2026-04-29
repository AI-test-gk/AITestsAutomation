module.exports = {
    // Lint then format JavaScript files across the project
    '**/*.{js,jsx}': filenames => [
        `npx eslint --fix ${filenames.join(' ')}`,
        `npx prettier --write ${filenames.join(' ')} --config ./.prettierrc`
    ],

    // Format CSS, SCSS, MarkDown and JSON
    '**/*.{scss,css,md,json,yml,yaml}': filenames => [
        `npx prettier --write ${filenames.join(' ')} --config ./.prettierrc`
    ]
};
