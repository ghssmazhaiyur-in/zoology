// quiz.js

const quizData = [
    {
        question: "Which of the following microorganism is used for production of citric acid in industries?",
        a: "Lactobacillus bulgaris",
        b: "Penicillium citrinum",
        c: "Aspergillus niger",
        d: "Rhizopus nigricans",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following pair is correctly matched for the product produced by them?",
        a: "Acetobacter aceti - Antibiotics",
        b: "Methanobacterium - Lactic acid",
        c: "Penicillium notatum - Acetic acid",
        d: "Saccharomyces cerevisiae - Ethanol",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "The most common substrate used in distilleries for the production of ethanol is_________",
        a: "Soyameal",
        b: "Groundgram",
        c: "Molasses",
        d: "Corn meal",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Cyclosporin – A is an immunosuppressive drug produced from _______",
        a: "Aspergillus niger",
        b: "Monascus purpureus",
        c: "Penicillium notatum",
        d: "Trichoderma polysporum",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "CO2 is not released during",
        a: "Alcoholic fermentation",
        b: "Lactate fermentation",
        c: "Aerobic respiration in animals",
        d: "Aerobic respiration in plants",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The purpose of biological treatment of waste water is to _______",
        a: "Reduce BOD",
        b: "Increase BOD",
        c: "Reduce sedimentation",
        d: "Increase sedimentation",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "The gases produced in anaerobic sludge digesters are",
        a: "Methane, oxygen and hydrogen sulphide.",
        b: "Hydrogen sulphide, methane and sulphur dioxide.",
        c: "Hydrogen sulphide, nitrogen and methane.",
        d: "Methane, hydrogen sulphide and CO2.",
        correct: "d",
        answered: null // Initialize answered property
    }
    
];

let index = 0;
const total = quizData.length;

const questionBox = document.getElementById("questionBox");
const questionNav = document.getElementById("questionNav");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");
const homeButton = document.getElementById("homeButton");

// Function to initialize the quiz
const initializeQuiz = () => {
    loadQuestion(index);
    populateQuestionNav();
    setupEventListeners();
};

// Function to load a question
const loadQuestion = (index) => {
    if (index < 0 || index >= total) {
        return;
    }
    const data = quizData[index];
    questionBox.innerHTML = `
        <div>
            <h2>${index + 1}. ${renderOption(data.question)}</h2>
            <div class="options">
                <label><input type="radio" name="answer${index}" value="a">${renderOption(data.a)}</label><br>
                <label><input type="radio" name="answer${index}" value="b">${renderOption(data.b)}</label><br>
                <label><input type="radio" name="answer${index}" value="c">${renderOption(data.c)}</label><br>
                <label><input type="radio" name="answer${index}" value="d">${renderOption(data.d)}</label><br>
            </div>
        </div>
    `;

    // Check if there's a previously saved answer and mark it as checked
    if (data.answered !== null) {
        const selectedInput = questionBox.querySelector(`input[value="${data.answered}"]`);
        if (selectedInput) {
            selectedInput.checked = true;
        }
    }

    updateNavigation();
};

// Function to render options (handles images)
const renderOption = (option) => {
    if (option.endsWith('.png') || option.endsWith('.jpg') || option.endsWith('.jpeg') || option.endsWith('.gif')) {
        return `<img src="${option}" alt="Option Image" class="option-image">`;
    } else {
        return option; // Display text if not an image path
    }
};

// Function to populate question navigation bar
const populateQuestionNav = () => {
    questionNav.innerHTML = '';
    quizData.forEach((_, i) => {
        const li = document.createElement('li');
        li.innerText = `${i + 1}`;
        li.onclick = () => jumpToQuestion(i);
        if (quizData[i].answered !== null) {
            li.classList.add('answered');
        }
        questionNav.appendChild(li);
    });
};

// Function to update navigation buttons visibility and state
const updateNavigation = () => {
    prevButton.disabled = index === 0;
    nextButton.disabled = index === total - 1;
    submitButton.style.display = index === total - 1 ? "block" : "none";
};

// Function to navigate to a specific question
const jumpToQuestion = (i) => {
    saveAnswer(); // Save answer before jumping to another question
    index = i;
    loadQuestion(index);
};

// Function to move to the next question
const nextQuestion = () => {
    saveAnswer(); // Save answer before moving to next question
    index++;
    if (index < total) {
        loadQuestion(index);
    } else {
        updateNavigation();
    }
};

// Function to move to the previous question
const previousQuestion = () => {
    saveAnswer(); // Save answer before moving to previous question
    if (index > 0) {
        index--;
        loadQuestion(index);
    }
};

// Function to save the current answer
const saveAnswer = () => {
    const selectedInput = getSelectedInput();
    if (selectedInput) {
        quizData[index].answered = selectedInput.value;
        markQuestionAsAnswered(index);
    }
};

// Function to get selected input
const getSelectedInput = () => {
    const inputs = document.getElementsByName(`answer${index}`);
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            return inputs[i];
        }
    }
    return null;
};

// Function to mark question as answered in the navigation
const markQuestionAsAnswered = (index) => {
    const li = questionNav.children[index];
    if (li) {
        li.classList.add('answered');
    }
};

// Function to setup event listeners for radio button changes
const setupEventListeners = () => {
    questionBox.addEventListener("change", () => {
        saveAnswer(); // Save answer whenever a radio button changes
    });
};

// Event listener for submit button
submitButton.addEventListener("click", () => {
    submitQuiz();
});

// Function to submit the quiz
const submitQuiz = () => {
    saveAnswer(); // Save answer before submitting the quiz
    
    let correct = 0;
    quizData.forEach(question => {
        if (question.answered === question.correct) {
            correct++;
        }
    });
    displayResults(correct);
};

// Function to display results
const displayResults = (correct) => {
    questionBox.innerHTML = `
        <h2>RESULT</h2>
        <p>Total correct answers: ${correct} out of ${total}</p>
        <p>${getResultMessage(correct)}</p>
    `;
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    homeButton.style.display = "block";
    questionNav.style.display = "none";
};

// Function to get result message based on score
const getResultMessage = (correct) => {
    const score = (correct / total) * 100;
    if (score >= 75) {
        return "Congratulations! Excellent job!";
    } else if (score >= 50) {
        return "Good job! You did well.";
    } else if (score >= 25) {
        return "You can do better. Keep practicing.";
    } else {
        return "Read more to improve your knowledge.";
    }
};

// Initialize the quiz
initializeQuiz();
