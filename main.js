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
    const regionNavigation = document.querySelector('.region-navigation'); // Get region navigation

    const showSection = (sectionToShow) => {
        // Hide all sections initially
        regionNavigation.style.display = 'none';
        muscleExplorerSection.style.display = 'none';
        flashcardAppSection.style.display = 'none';

        if (sectionToShow === 'muscle-explorer') {
            muscleExplorerSection.style.display = 'flex';
        } else if (sectionToShow === 'flashcard-app') {
            flashcardAppSection.style.display = 'flex';
        } else if (sectionToShow === 'regions') {
            regionNavigation.style.display = 'flex';
        }
    };

    const showRegions = () => {
        showSection('regions');
    }

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
        // Upper Limb (more than 30 entries)
        { front: "위팔두갈래근 (Biceps Brachii)", back: "위팔 앞쪽에 위치하며 팔꿉관절 굽힘과 아래팔 뒤침에 관여합니다.", category: "upper-limb" },
        { front: "위팔세갈래근 (Triceps Brachii)", back: "위팔 뒤쪽에 위치하며 팔꿉관절 폄에 관여합니다.", category: "upper-limb" },
        { front: "어깨세모근 (Deltoid)", back: "어깨를 덮는 큰 근육으로, 위팔뼈를 벌리는(외전) 역할을 합니다.", category: "upper-limb" },
        { front: "위팔노근 (Brachioradialis)", back: "아래팔에 위치하며 팔꿉관절 굽힘과 아래팔 엎침/뒤침을 돕습니다.", category: "upper-limb" },
        { front: "가시위근 (Supraspinatus)", back: "어깨돌림근띠(회전근개)의 일부로 위팔뼈를 벌리는(외전) 데 기여합니다.", category: "upper-limb" },
        { front: "가시아래근 (Infraspinatus)", back: "어깨돌림근띠의 일부로 위팔뼈를 가쪽돌림(외회전)하는 데 기여합니다.", category: "upper-limb" },
        { front: "작은원근 (Teres Minor)", back: "어깨돌림근띠의 일부로 위팔뼈를 가쪽돌림(외회전)하는 데 도움을 줍니다.", category: "upper-limb" },
        { front: "어깨밑근 (Subscapularis)", back: "어깨돌림근띠의 일부로 위팔뼈를 안쪽돌림(내회전)하는 데 기여합니다.", category: "upper-limb" },
        { front: "큰원근 (Teres Major)", back: "어깨관절에서 위팔뼈의 모음(내전), 안쪽돌림, 폄에 관여합니다.", category: "upper-limb" },
        { front: "큰가슴근 (Pectoralis Major)", back: "가슴의 큰 근육으로, 위팔뼈를 안쪽으로 모으고 돌리는 역할을 합니다.", category: "upper-limb" },
        { front: "작은가슴근 (Pectoralis Minor)", back: "어깨뼈를 안정화하고 아래로 당기는 역할을 합니다.", category: "upper-limb" },
        { front: "앞톱니근 (Serratus Anterior)", back: "어깨뼈를 가슴우리(흉곽)에 고정하고 앞으로 내미는 역할을 합니다.", category: "upper-limb" },
        { front: "위팔근 (Brachialis)", back: "팔꿉관절 굽힘에 가장 강력하게 작용하는 근육입니다.", category: "upper-limb" },
        { front: "부리위팔근 (Coracobrachialis)", back: "위팔뼈의 굽힘과 모음(내전)을 돕습니다.", category: "upper-limb" },
        { front: "뒤침근 (Supinator)", back: "아래팔을 뒤침(손바닥이 위로 향하게)하는 역할을 합니다.", category: "upper-limb" },
        { front: "원엎침근 (Pronator Teres)", back: "아래팔을 엎침(손바닥이 아래로 향하게)하는 역할을 합니다.", category: "upper-limb" },
        { front: "긴노쪽손목폄근 (Extensor Carpi Radialis Longus)", back: "손목을 펴고(신전) 노쪽(엄지손가락 쪽)으로 벌리는(외전) 역할을 합니다.", category: "upper-limb" },
        { front: "짧은노쪽손목폄근 (Extensor Carpi Radialis Brevis)", back: "손목을 펴고 노쪽으로 벌리는 역할을 합니다.", category: "upper-limb" },
        { front: "자쪽손목폄근 (Extensor Carpi Ulnaris)", back: "손목을 펴고 자쪽(새끼손가락 쪽)으로 모으는(내전) 역할을 합니다.", category: "upper-limb" },
        { front: "손가락폄근 (Extensor Digitorum)", back: "손가락들을 펴는 역할을 합니다.", category: "upper-limb" },
        { front: "집게손가락폄근 (Extensor Indicis)", back: "집게 손가락을 펴는 역할을 합니다.", category: "upper-limb" },
        { front: "새끼손가락폄근 (Extensor Digiti Minimi)", back: "새끼 손가락을 펴는 역할을 합니다.", category: "upper-limb" },
        { front: "긴엄지벌림근 (Abductor Pollicis Longus)", back: "엄지 손가락을 벌리고 펴는 역할을 합니다.", category: "upper-limb" },
        { front: "짧은엄지폄근 (Extensor Pollicis Brevis)", back: "엄지 손가락의 첫 마디를 펴는 역할을 합니다.", category: "upper-limb" },
        { front: "긴엄지폄근 (Extensor Pollicis Longus)", back: "엄지 손가락의 두 번째 마디를 펴는 역할을 합니다.", category: "upper-limb" },
        { front: "노쪽손목굽힘근 (Flexor Carpi Radialis)", back: "손목을 굽히고 노쪽으로 벌리는 역할을 합니다.", category: "upper-limb" },
        { front: "자쪽손목굽힘근 (Flexor Carpi Ulnaris)", back: "손목을 굽히고 자쪽으로 모으는 역할을 합니다.", category: "upper-limb" },
        { front: "긴손바닥근 (Palmaris Longus)", back: "손목을 굽히고 손바닥근막을 긴장시키는 역할을 합니다.", category: "upper-limb" },
        { front: "얕은손가락굽힘근 (Flexor Digitorum Superficialis)", back: "손가락의 중간 마디를 굽히는 역할을 합니다.", category: "upper-limb" },
        { front: "깊은손가락굽힘근 (Flexor Digitorum Profundus)", back: "손가락의 끝 마디를 굽히는 역할을 합니다.", category: "upper-limb" },
        { front: "긴엄지굽힘근 (Flexor Pollicis Longus)", back: "엄지 손가락을 굽히는 역할을 합니다.", category: "upper-limb" },
        { front: "네모엎침근 (Pronator Quadratus)", back: "아래팔을 엎침하는 역할을 합니다.", category: "upper-limb" },
        { front: "마름근 (Rhomboids)", back: "어깨뼈를 모으고(내전) 위로 돌리는 역할을 합니다.", category: "upper-limb" },
        { front: "어깨올림근 (Levator Scapulae)", back: "어깨뼈를 올리고(거상) 아래로 돌리는 역할을 합니다.", category: "upper-limb" },
        { front: "넓은등근 (Latissimus Dorsi)", back: "등의 넓은 근육으로, 위팔뼈를 아래로 당기고 안으로 돌리는 역할을 합니다.", category: "upper-limb" },

        // Lower Limb (more than 30 entries)
        {
            front: "넙다리네갈래근 (Quadriceps Femoris)",
            back: "작용: 무릎관절 폄, 엉덩관절 굽힘 (넙다리곧은근); 신경지배: 넙다리신경; 이는곳: 위앞엉덩뼈가시, 넙다리뼈 몸통; 닿는곳: 무릎뼈, 정강뼈거친면",
            category: "lower-limb"
        },
        {
            front: "넙다리곧은근 (Rectus Femoris)",
            back: "작용: 엉덩관절 굽힘, 무릎관절 폄; 신경지배: 넙다리신경; 이는곳: 위앞엉덩뼈가시; 닿는곳: 무릎뼈, 정강뼈거친면",
            category: "lower-limb"
        },
        {
            front: "가쪽넓은근 (Vastus Lateralis)",
            back: "작용: 무릎관절 폄; 신경지배: 넙다리신경; 이는곳: 넙다리뼈 큰돌기, 거친선; 닿는곳: 무릎뼈, 정강뼈거친면",
            category: "lower-limb"
        },
        {
            front: "안쪽넓은근 (Vastus Medialis)",
            back: "작용: 무릎관절 폄; 신경지배: 넙다리신경; 이는곳: 넙다리뼈 거친선; 닿는곳: 무릎뼈, 정강뼈거친면",
            category: "lower-limb"
        },
        {
            front: "중간넓은근 (Vastus Intermedius)",
            back: "작용: 무릎관절 폄; 신경지배: 넙다리신경; 이는곳: 넙다리뼈 몸통 앞가쪽면; 닿는곳: 무릎뼈, 정강뼈거친면",
            category: "lower-limb"
        },
        {
            front: "넙다리뒤근 (Hamstrings)",
            back: "작용: 무릎관절 굽힘, 엉덩관절 폄; 신경지배: 궁둥신경; 이는곳: 궁둥뼈결절; 닿는곳: 정강뼈, 종아리뼈",
            category: "lower-limb"
        },
        {
            front: "넙다리두갈래근 (Biceps Femoris)",
            back: "작용: 무릎관절 굽힘, 엉덩관절 폄; 신경지배: 궁둥신경; 이는곳: 궁둥뼈결절, 넙다리뼈 거친선; 닿는곳: 종아리뼈머리",
            category: "lower-limb"
        },
        {
            front: "반힘줄근 (Semitendinosus)",
            back: "작용: 무릎관절 굽힘, 엉덩관절 폄; 신경지배: 궁둥신경; 이는곳: 궁둥뼈결절; 닿는곳: 정강뼈몸통 안쪽면",
            category: "lower-limb"
        },
        {
            front: "반막근 (Semimembranosus)",
            back: "작용: 무릎관절 굽힘, 엉덩관절 폄; 신경지배: 궁둥신경; 이는곳: 궁둥뼈결절; 닿는곳: 정강뼈 안쪽관절융기",
            category: "lower-limb"
        },
        {
            front: "큰볼기근 (Gluteus Maximus)",
            back: "작용: 엉덩관절 폄, 가쪽돌림; 신경지배: 아래볼기신경; 이는곳: 엉치뼈, 꼬리뼈, 엉덩뼈; 닿는곳: 넙다리뼈 볼기근거친면, 엉덩정강띠",
            category: "lower-limb"
        },
        {
            front: "중간볼기근 (Gluteus Medius)",
            back: "작용: 엉덩관절 벌림, 안쪽돌림; 신경지배: 위볼기신경; 이는곳: 엉덩뼈 바깥면; 닿는곳: 넙다리뼈 큰돌기",
            category: "lower-limb"
        },
        {
            front: "작은볼기근 (Gluteus Minimus)",
            back: "작용: 엉덩관절 벌림, 안쪽돌림; 신경지배: 위볼기신경; 이는곳: 엉덩뼈 바깥면; 닿는곳: 넙다리뼈 큰돌기",
            category: "lower-limb"
        },
        {
            front: "궁둥구멍근 (Piriformis)",
            back: "작용: 엉덩관절 가쪽돌림, 벌림; 신경지배: 궁둥구멍근신경; 이는곳: 엉치뼈 앞면; 닿는곳: 넙다리뼈 큰돌기",
            category: "lower-limb"
        },
        {
            front: "큰모음근 (Adductor Magnus)",
            back: "작용: 엉덩관절 모음, 폄; 신경지배: 폐쇄신경, 궁둥신경; 이는곳: 궁둥뼈결절, 두덩뼈; 닿는곳: 넙다리뼈 거친선, 모음근결절",
            category: "lower-limb"
        },
        {
            front: "긴모음근 (Adductor Longus)",
            back: "작용: 엉덩관절 모음, 굽힘; 신경지배: 폐쇄신경; 이는곳: 두덩뼈; 닿는곳: 넙다리뼈 거친선",
            category: "lower-limb"
        },
        {
            front: "짧은모음근 (Adductor Brevis)",
            back: "작용: 엉덩관절 모음, 굽힘; 신경지배: 폐쇄신경; 이는곳: 두덩뼈; 닿는곳: 넙다리뼈 거친선",
            category: "lower-limb"
        },
        {
            front: "두덩근 (Pectineus)",
            back: "작용: 엉덩관절 굽힘, 모음; 신경지배: 넙다리신경, 폐쇄신경; 이는곳: 두덩뼈; 닿는곳: 넙다리뼈 두덩근선",
            category: "lower-limb"
        },
        {
            front: "두덩정강근 (Gracilis)",
            back: "작용: 엉덩관절 모음, 무릎관절 굽힘; 신경지배: 폐쇄신경; 이는곳: 두덩뼈; 닿는곳: 정강뼈 몸통 안쪽면",
            category: "lower-limb"
        },
        {
            front: "넙다리빗근 (Sartorius)",
            back: "작용: 엉덩관절 굽힘, 벌림, 가쪽돌림, 무릎관절 굽힘; 신경지배: 넙다리신경; 이는곳: 위앞엉덩뼈가시; 닿는곳: 정강뼈 몸통 안쪽면",
            category: "lower-limb"
        },
        {
            front: "엉덩허리근 (Iliopsoas)",
            back: "작용: 엉덩관절 굽힘; 신경지배: 넙다리신경, 허리신경얼기; 이는곳: 엉덩뼈, 허리뼈; 닿는곳: 넙다리뼈 작은돌기",
            category: "lower-limb"
        },
        {
            front: "엉덩근 (Iliacus)",
            back: "작용: 엉덩관절 굽힘; 신경지배: 넙다리신경; 이는곳: 엉덩뼈오목; 닿는곳: 넙다리뼈 작은돌기",
            category: "lower-limb"
        },
        {
            front: "큰허리근 (Psoas Major)",
            back: "작용: 엉덩관절 굽힘, 허리뼈 가쪽굽힘; 신경지배: 허리신경얼기; 이는곳: 허리뼈 가로돌기; 닿는곳: 넙다리뼈 작은돌기",
            category: "lower-limb"
        },
        {
            front: "넙다리근막긴장근 (Tensor Fasciae Latae)",
            back: "작용: 엉덩관절 굽힘, 벌림, 안쪽돌림, 무릎관절 가쪽 안정화; 신경지배: 위볼기신경; 이는곳: 위앞엉덩뼈가시; 닿는곳: 엉덩정강띠",
            category: "lower-limb"
        },
        {
            front: "앞정강근 (Tibialis Anterior)",
            back: "작용: 발목 등쪽굽힘, 발 안쪽번짐; 신경지배: 깊은종아리신경; 이는곳: 정강뼈 가쪽관절융기; 닿는곳: 안쪽쐐기뼈, 첫째발허리뼈바닥",
            category: "lower-limb"
        },
        {
            front: "긴종아리근 (Fibularis/Peroneus Longus)",
            back: "작용: 발목 발바닥굽힘, 발 가쪽번짐; 신경지배: 얕은종아리신경; 이는곳: 종아리뼈 머리, 가쪽관절융기; 닿는곳: 안쪽쐐기뼈, 첫째발허리뼈바닥",
            category: "lower-limb"
        },
        {
            front: "짧은종아리근 (Fibularis/Peroneus Brevis)",
            back: "작용: 발목 발바닥굽힘, 발 가쪽번짐; 신경지배: 얕은종아리신경; 이는곳: 종아리뼈 가쪽면; 닿는곳: 다섯째발허리뼈 거친면",
            category: "lower-limb"
        },
        {
            front: "장딴지근 (Gastrocnemius)",
            back: "작용: 발목 발바닥굽힘, 무릎관절 굽힘; 신경지배: 정강신경; 이는곳: 넙다리뼈 안쪽/가쪽관절융기; 닿는곳: 발꿈치뼈 (아킬레스건)",
            category: "lower-limb"
        },
        {
            front: "가자미근 (Soleus)",
            back: "작용: 발목 발바닥굽힘; 신경지배: 정강신경; 이는곳: 정강뼈, 종아리뼈; 닿는곳: 발꿈치뼈 (아킬레스건)",
            category: "lower-limb"
        },
        {
            front: "뒤정강근 (Tibialis Posterior)",
            back: "작용: 발목 발바닥굽힘, 발 안쪽번짐; 신경지배: 정강신경; 이는곳: 정강뼈, 종아리뼈 뒤면; 닿는곳: 발배뼈, 쐐기뼈, 발허리뼈바닥",
            category: "lower-limb"
        },
        {
            front: "긴발가락폄근 (Extensor Digitorum Longus)",
            back: "작용: 발가락 폄, 발목 등쪽굽힘; 신경지배: 깊은종아리신경; 이는곳: 정강뼈 가쪽관절융기, 종아리뼈; 닿는곳: 발가락 중간/먼쪽뼈",
            category: "lower-limb"
        },
        {
            front: "긴엄지폄근 (Extensor Hallucis Longus)",
            back: "작용: 엄지발가락 폄, 발목 등쪽굽힘; 신경지배: 깊은종아리신경; 이는곳: 종아리뼈 중간면; 닿는곳: 엄지발가락 먼쪽뼈",
            category: "lower-limb"
        },
        {
            front: "긴발가락굽힘근 (Flexor Digitorum Longus)",
            back: "작용: 발가락 굽힘, 발목 발바닥굽힘; 신경지배: 정강신경; 이는곳: 정강뼈 뒤면; 닿는곳: 발가락 먼쪽뼈",
            category: "lower-limb"
        },
        {
            front: "긴엄지굽힘근 (Flexor Hallucis Longus)",
            back: "작용: 엄지발가락 굽힘, 발목 발바닥굽힘; 신경지배: 정강신경; 이는곳: 종아리뼈 뒤면; 닿는곳: 엄지발가락 먼쪽뼈",
            category: "lower-limb"
        },
        {
            front: "셋째종아리근 (Fibularis Tertius)",
            back: "작용: 발목 등쪽굽힘, 발 가쪽번짐; 신경지배: 깊은종아리신경; 이는곳: 종아리뼈 앞면; 닿는곳: 다섯째발허리뼈바닥",
            category: "lower-limb"
        },
        {
            front: "짧은발가락폄근 (Extensor Digitorum Brevis)",
            back: "작용: 발가락 2-4지 폄; 신경지배: 깊은종아리신경; 이는곳: 발꿈치뼈; 닿는곳: 발가락 중간/먼쪽뼈",
            category: "lower-limb"
        },
        {
            front: "짧은엄지폄근 (Extensor Hallucis Brevis)",
            back: "작용: 엄지발가락 폄; 신경지배: 깊은종아리신경; 이는곳: 발꿈치뼈; 닿는곳: 엄지발가락 몸쪽뼈",
            category: "lower-limb"
        },
        {
            front: "장딴지빗근 (Plantaris)",
            back: "작용: 무릎관절 굽힘, 발목 발바닥굽힘; 신경지배: 정강신경; 이는곳: 넙다리뼈 가쪽관절융기; 닿는곳: 발꿈치뼈",
            category: "lower-limb"
        }
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
    const backToRegionsBtn = document.getElementById('back-to-regions-btn'); // New button

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

    if (backToRegionsBtn) {
        backToRegionsBtn.addEventListener('click', () => {
            showRegions();
        });
    }

    // Initialize the view to show region selection
    showRegions();
});