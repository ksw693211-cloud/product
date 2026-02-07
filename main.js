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

    // New navigation button handlers
    const upperLimbBtn = document.getElementById('upper-limb-btn');
    const lowerLimbBtn = document.getElementById('lower-limb-btn');

    if (upperLimbBtn) {
        upperLimbBtn.addEventListener('click', () => {
            alert('상지 (Upper Limb) 정보 표시 예정');
            // Future: Load upper limb muscle data
        });
    }

    if (lowerLimbBtn) {
        lowerLimbBtn.addEventListener('click', () => {
            alert('하지 (Lower Limb) 정보 표시 예정');
            // Future: Load lower limb muscle data
        });
    }
});
