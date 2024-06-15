// quiz.js

const quizData = [
    {
        question: "Which of the following region has maximum biodiversity",
        a: "Taiga",
        b: "Tropical forest",
        c: "Temperate rain forest",
        d: "Mangroves",
        correct: "b",
        answered: null
    },
    {
        question: "Conservation of biodiversity within their natural habitat is",
        a: "Insitu conservation",
        b: "Exsitu conservation",
        c: "In vivo conservation",
        d: "In vitro conservation",
        correct: "a",
        answered: null
    },
    {
        question: "Which one of the following is not coming under insitu conservation",
        a: "Sanctuaries",
        b: "Natural parks",
        c: "Zoological park",
        d: "Biosphere reserve",
        correct: "c",
        answered: null
    },
    {
        question: "Which of the following is considered a hotspots of biodiversity in India",
        a: "Western ghats",
        b: "Indo-gangetic plain",
        c: "Eastern Himalayas",
        d: "A and C",
        correct: "d",
        answered: null
    },
    {
        question: "The organization which published the red list of species is",
        a: "WWF",
        b: "IUCN",
        c: "ZSI",
        d: "UNEP",
        correct: "b",
        answered: null
    },
    {
        question: "Who introduced the term biodiversity?",
        a: "Edward Wilson",
        b: "Walter Rosen",
        c: "Norman Myers",
        d: "Alice Norman",
        correct: "b",
        answered: null
    },
    {
        question: "Which of the following forests is known as the lungs of the planet earth?",
        a: "Tundra forest",
        b: "Rain forest of north east India",
        c: "Taiga forest",
        d: "Amazon rain forest",
        correct: "d",
        answered: null
    },
    {
        question: "Which one of the following are at high risk extinction due to habitat destruction",
        a: "Mammals",
        b: "Birds",
        c: "Amphibians",
        d: "Echinoderms",
        correct: "c",
        answered: null
    },
    {
        question: "Assertion: The Environmental conditions of the tropics are favourable for speciation and diversity of organisms.\nReason: The climate seasons, temperature, humidity and photoperiod are more or less stable and congenial.",
        a: "Both Assertion and Reason are true and Reason explains Assertion correctly.",
        b: "Both Assertion and Reason are true but Reason is not the correct explanation of Assertion.",
        c: "Assertion is true, but Reason is false.",
        d: "Both Assertion and Reason are false.",
        correct: "a",
        answered: null
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
