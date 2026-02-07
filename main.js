document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme
    const setTheme = (isLightMode) => {
        if (isLightMode) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setTheme(true);
    } else {
        // Default to dark mode if no preference or 'dark' is saved
        setTheme(false);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isLightMode = body.classList.contains('light-mode');
        setTheme(!isLightMode);
    });
});
