let currentQuestion = 0;
let score = 0;
let lives = 3; // Starting lives

// 15 Questions with various types
const questions = [
    {
        type: "multiple-choice", 
        question: "Apa itu SDGs?", 
        options: ["Sustainable Development Goals", "Systematic Development Goals", "Social Development Goals", "Scientific Development Goals"],
        answer: 1
    },
    {
        type: "true-false", 
        question: "Sila ke-5 Pancasila adalah Keadilan Sosial bagi Seluruh Rakyat Indonesia.", 
        options: ["True", "False"],
        answer: 1 // True
    },
    {
        type: "fill-in", 
        question: "SDG 4 bertujuan untuk meningkatkan kualitas _______.",
        correctAnswer: "pendidikan"
    },
    {
        type: "matching", 
        question: "Cocokkan Sila Pancasila dengan nilai-nilai yang sesuai.",
        options: {
            1: "Ketuhanan yang Maha Esa", 2: "Kemanusiaan yang Adil dan Beradab", 3: "Persatuan Indonesia", 4: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan", 5: "Keadilan Sosial bagi Seluruh Rakyat Indonesia"
        },
        matchingPairs: {
            1: "Ketuhanan", 2: "Kemanusiaan", 3: "Persatuan", 4: "Demokrasi", 5: "Keadilan"
        },
        answer: true // Correct if pairs are matched
    },
    {
        type: "multiple-choice",
        question: "Apa yang dimaksud dengan Tujuan SDG 1?",
        options: ["Pengentasan Kemiskinan", "Kesehatan yang Lebih Baik", "Pendidikan yang Berkualitas", "Keadilan Sosial"],
        answer: 1
    },
    {
        type: "multiple-choice",
        question: "Pancasila merupakan dasar negara Indonesia yang terdiri dari ____ sila.",
        options: ["4", "5", "6", "7"],
        answer: 2
    },
    {
        type: "true-false",
        question: "Indonesia mendukung penuh implementasi SDGs di tingkat global.",
        options: ["True", "False"],
        answer: 1 // True
    },
    {
        type: "fill-in",
        question: "Sila kedua Pancasila mengandung nilai _______ yang beradab.",
        correctAnswer: "kemanusiaan"
    },
    {
        type: "true-false",
        question: "SDGs bertujuan untuk mencapai keberlanjutan sosial, ekonomi, dan lingkungan pada tahun 2030.",
        options: ["True", "False"],
        answer: 1 // True
    },
    {
        type: "multiple-choice",
        question: "SDG 4 bertujuan untuk mencapai _______.",
        options: ["Kesehatan yang Lebih Baik", "Pendidikan yang Berkualitas", "Pengentasan Kemiskinan", "Keadilan Sosial"],
        answer: 2
    },
    {
        type: "multiple-choice",
        question: "Bagaimana Indonesia berperan dalam SDGs Pendidikan?",
        options: ["Melalui Program Sumber Daya Alam", "Melalui Program Pendidikan yang Inklusif dan Berkualitas", "Melalui Teknologi dan Inovasi", "Melalui Pengembangan Infrastruktur"],
        answer: 2
    },
    {
        type: "fill-in",
        question: "Pendidikan di Indonesia akan mencakup akses yang lebih besar terhadap _______.",
        correctAnswer: "pendidikan berkualitas"
    },
    {
        type: "matching",
        question: "Cocokkan setiap tujuan SDGs dengan definisi yang benar.",
        options: {
            1: "No Poverty", 2: "Zero Hunger", 3: "Good Health", 4: "Quality Education", 5: "Gender Equality"
        },
        matchingPairs: {
            1: "Pengentasan Kemiskinan", 2: "Menghilangkan Kelaparan", 3: "Kesehatan yang Baik", 4: "Pendidikan yang Berkualitas", 5: "Kesetaraan Gender"
        },
        answer: true
    },
    {
        type: "multiple-choice",
        question: "Pancasila sebagai dasar negara Indonesia disahkan pada tanggal _______",
        options: ["17 Agustus 1945", "1 Juni 1945", "18 Agustus 1945", "19 Mei 1945"],
        answer: 3
    }
];

function loadQuestion() {
    console.log("Loading question...");
    const question = questions[currentQuestion];
    console.log(question);
    if (!question) {
        console.log("No more questions to load.");
        return;
    }

    let optionsHTML = '';
    if (question.type === "multiple-choice") {
        // Multiple choice options
        question.options.forEach((option, index) => {
            optionsHTML += `<button class="answer-button" onclick="checkAnswer(${index + 1})">${option}</button>`;
        });
    } else if (question.type === "true-false") {
        optionsHTML = `
            <button class="answer-button" onclick="checkAnswer(1)">True</button>
            <button class="answer-button" onclick="checkAnswer(2)">False</button>
        `;
    } else if (question.type === "fill-in") {
        optionsHTML = `<input type="text" id="fill-in-answer" placeholder="Isi jawaban..." />`;
        optionsHTML += `<button class="answer-button" onclick="checkAnswer()">Submit Answer</button>`;
    } else if (question.type === "matching") {
        optionsHTML = '<div id="matching-container"></div>';
        createMatchingGame(question);
    }
    document.getElementById('options-container').innerHTML = optionsHTML;
}

function createMatchingGame(question) {
    let leftItems = Object.keys(question.options).map(key => `<div class="matching-item" id="left-${key}" onclick="selectItem('left', ${key})">${question.options[key]}</div>`).join('');
    let rightItems = Object.keys(question.matchingPairs).map(key => `<div class="matching-item" id="right-${key}" onclick="selectItem('right', ${key})">${question.matchingPairs[key]}</div>`).join('');

    document.getElementById('matching-container').innerHTML = `
        <div class="matching-list" id="left-list">${leftItems}</div>
        <div class="matching-list" id="right-list">${rightItems}</div>
        <button class="answer-button" onclick="checkMatchingAnswer()">Check Answer</button>
    `;
}

let selectedItems = {
    left: null,
    right: null
};

function selectItem(side, key) {
    selectedItems[side] = key;
    const item = document.getElementById(`${side}-${key}`);
    item.classList.toggle('selected');
}

function checkMatchingAnswer() {
    const question = questions[currentQuestion];
    if (selectedItems.left && selectedItems.right) {
        const leftKey = selectedItems.left;
        const rightKey = selectedItems.right;
        if (question.matchingPairs[leftKey] === question.options[rightKey]) {
            score++;
            document.getElementById('result').textContent = "Benar! Skor bertambah.";
        } else {
            lives--;
            document.getElementById('result').textContent = "Salah! Kehilangan 1 nyawa.";
        }
        updateLivesDisplay();
        nextQuestion();
    }
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (question.type === "multiple-choice") {
        isCorrect = selectedOption === question.answer;
    } else if (question.type === "true-false") {
        isCorrect = selectedOption === question.answer;
    } else if (question.type === "fill-in") {
        const userAnswer = document.getElementById('fill-in-answer').value.trim().toLowerCase();
        isCorrect = userAnswer === question.correctAnswer;
    }

    if (!isCorrect) {
        lives--;
        updateLivesDisplay();
        if (lives === 0) {
            gameOver();
        } else {
            document.getElementById('result').textContent = "Salah! Kehilangan 1 nyawa.";
            document.getElementById('result-container').style.display = 'block';
        }
    } else {
        score++;
        document.getElementById('result').textContent = "Benar! Skor bertambah.";
        document.getElementById('result-container').style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById('result-container').style.display = 'none';
    } else {
        gameOver();
    }
}

function gameOver() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
}

function updateLivesDisplay() {
    document.getElementById('lives').textContent = `Nyawa: ${lives}`;
}

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('intro-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    loadQuestion();
});

window.onload = loadQuestion;