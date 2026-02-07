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

    // --- Section Switching Logic ---
    const muscleExplorerSection = document.getElementById('muscle-explorer-section');
    const flashcardAppSection = document.getElementById('flashcard-app');
    const muscleExplorerBtn = document.getElementById('muscle-explorer-btn');
    const flashcardAppBtn = document.getElementById('flashcard-app-btn');

    const showSection = (sectionToShow) => {
        if (sectionToShow === 'muscle-explorer') {
            muscleExplorerSection.style.display = 'flex';
            flashcardAppSection.style.display = 'none';
        } else if (sectionToShow === 'flashcard-app') {
            muscleExplorerSection.style.display = 'none';
            flashcardAppSection.style.display = 'flex';
        }
    };

    if (muscleExplorerBtn) {
        muscleExplorerBtn.addEventListener('click', () => showSection('muscle-explorer'));
    }
    if (flashcardAppBtn) {
        flashcardAppBtn.addEventListener('click', () => showSection('flashcard-app'));
    }

    // Initially show the muscle explorer section
    showSection('muscle-explorer');

    // --- Muscle Anatomy Explorer Handlers (existing) ---
    const upperLimbBtn = document.getElementById('upper-limb-btn');
    const lowerLimbBtn = document.getElementById('lower-limb-btn');

    if (upperLimbBtn) {
        upperLimbBtn.addEventListener('click', () => {
            loadFlashcards('upper-limb');
        });
    }

    if (lowerLimbBtn) {
        lowerLimbBtn.addEventListener('click', () => {
            loadFlashcards('lower-limb');
        });
    }

    // --- Flashcard App Logic ---
    const allFlashcards = [
        // Upper Limb
        { front: "이두근 (Biceps brachii)", back: "팔 위쪽의 근육으로, 팔꿈치를 굽히고 손을 회전시키는 역할을 합니다.", category: "upper-limb" },
        { front: "삼두근 (Triceps brachii)", back: "팔 뒤쪽의 근육으로, 팔꿈치를 펴는 역할을 합니다.", category: "upper-limb" },
        { front: "삼각근 (Deltoid)", back: "어깨를 덮는 큰 근육으로, 팔을 들어 올리는 역할을 합니다.", category: "upper-limb" },
        { front: "대흉근 (Pectoralis major)", back: "가슴의 큰 근육으로, 팔을 몸 앞으로 모으고 회전시키는 역할을 합니다.", category: "upper-limb" },
        { front: "승모근 (Trapezius)", back: "목과 등 위쪽에 있는 큰 근육으로, 어깨를 움직이고 머리를 지지합니다.", category: "upper-limb" },
        { front: "회전근개 (Rotator Cuff)", back: "어깨 관절을 안정시키고 팔을 움직이는 네 개의 근육 그룹입니다.", category: "upper-limb" },

        // Lower Limb
        { front: "대퇴사두근 (Quadriceps femoris)", back: "허벅지 앞쪽의 큰 근육으로, 무릎을 펴는 역할을 합니다.", category: "lower-limb" },
        { front: "슬굴곡근 (Hamstrings)", back: "허벅지 뒤쪽의 근육으로, 무릎을 굽히고 엉덩이를 펴는 역할을 합니다.", category: "lower-limb" },
        { front: "대둔근 (Gluteus maximus)", back: "엉덩이의 가장 큰 근육으로, 엉덩이를 펴고 다리를 바깥쪽으로 돌리는 역할을 합니다.", category: "lower-limb" },
        { front: "비복근 (Gastrocnemius)", back: "종아리 뒤쪽의 큰 근육으로, 발목을 펴고 무릎을 굽히는 역할을 합니다.", category: "lower-limb" },
        { front: "가자미근 (Soleus)", back: "비복근 아래에 있는 종아리 근육으로, 발목을 펴는 역할을 합니다.", category: "lower-limb" },

        // General Anatomy (if any, for future expansion or default)
        { front: "늑골 (Ribs)", back: "흉강을 보호하는 뼈대입니다.", category: "general" }
    ];

    let currentFlashcards = []; // Holds the currently active set of flashcards
    let currentCardIndex = 0;
    let isFlipped = false;

    const flashcardElement = document.querySelector('.flashcard');
    const cardFrontText = document.getElementById('card-front-text');
    const cardBackText = document.getElementById('card-back-text');
    const flipBtn = document.getElementById('flip-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const displayCard = () => {
        if (currentFlashcards.length === 0) {
            cardFrontText.textContent = "No flashcards available for this category.";
            cardBackText.textContent = "";
            flashcardElement.classList.remove('flipped');
            isFlipped = false;
            // Optionally disable navigation buttons if no cards
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            flipBtn.disabled = true;
            return;
        }

        prevBtn.disabled = false;
        nextBtn.disabled = false;
        flipBtn.disabled = false;

        const card = currentFlashcards[currentCardIndex];
        cardFrontText.textContent = card.front;
        cardBackText.textContent = card.back;
        flashcardElement.classList.remove('flipped'); // Ensure card is always front-facing when changing
        isFlipped = false;
    };

    const loadFlashcards = (category) => {
        if (category === 'all') {
            currentFlashcards = [...allFlashcards];
        } else {
            currentFlashcards = allFlashcards.filter(card => card.category === category);
        }
        currentCardIndex = 0; // Reset index for new category
        displayCard();
        showSection('flashcard-app'); // Always show flashcard app when loading cards
    };

    if (flipBtn) {
        flipBtn.addEventListener('click', () => {
            if (currentFlashcards.length > 0) {
                flashcardElement.classList.toggle('flipped');
                isFlipped = !isFlipped;
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentFlashcards.length > 0) {
                currentCardIndex = (currentCardIndex - 1 + currentFlashcards.length) % currentFlashcards.length;
                displayCard();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentFlashcards.length > 0) {
                currentCardIndex = (currentCardIndex + 1) % currentFlashcards.length;
                displayCard();
            }
        });
    }

    // Initialize with all flashcards or a default category
    loadFlashcards('all');
});
