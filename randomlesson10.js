// quiz.js

const quizData = [
    {
        question: "All populations in a given physical area are defined as",
        a: "Biome",
        b: "Ecosystem",
        c: "Territory",
        d: "Biotic factors",
        correct: "b",
        answered: null
    },
    {
        question: "Organisms which can survive a wide range of temperature are called",
        a: "Ectotherms",
        b: "Eurytherms",
        c: "Endotherms",
        d: "Stenotherms",
        correct: "b",
        answered: null
    },
    {
        question: "The interaction in nature, where one gets benefit on the expense of other is...",
        a: "Predation",
        b: "Mutualism",
        c: "Amensalism",
        d: "Commensalism",
        correct: "a",
        answered: null
    },
    {
        question: "Predation and parasitism are which type of interactions?",
        a: "(+,+)",
        b: "(+, O)",
        c: "(--, --)",
        d: "(+, --)",
        correct: "d",
        answered: null
    },
    {
        question: "Competition between species leads to",
        a: "Extinction",
        b: "Mutation",
        c: "Amensalism",
        d: "Symbiosis",
        correct: "a",
        answered: null
    },
    {
        question: "Which of the following is an r-species",
        a: "Human",
        b: "Insects",
        c: "Rhinoceros",
        d: "Whale",
        correct: "b",
        answered: null
    },
    {
        question: "Match the following and choose the correct combination from the options given below. \nColumn I \tColumn II\nA. Mutalism \t1. Lion and deer\nB. Commensalism \t2. Round worm and man\nC. Parasitism \t3. Birds compete with squirrels for nuts\nD. Competition \t4. Sea anemone on hermit crab\nE. Predation \t5. Barnacles attached to Whales",
        a: "A- 4, B-5, C-2, D –3, E-1",
        b: "A- 3, B-1, C-4, D – 2, E-5",
        c: "A- 2, B-3, C-1, D – 5, E-4",
        d: "A- 5, B-4, C-2, D – 3, E-1",
        correct: "a",
        answered: null
    },
    {
        question: "The figure given below is a diagrammatic representation of response of organisms to abiotic factors. What do A, B and C represent respectively",
        a: "null",
        b: "null",
        c: "null",
        d: "null",
        correct: null,
        answered: null
    },
    {
        question: "The relationship between sucker fish and shark is...........",
        a: "Competition",
        b: "Commensalism",
        c: "Predation",
        d: "Parasitism",
        correct: "b",
        answered: null
    },
    {
        question: "Which of the following is correct for r-selected species",
        a: "Large number of progeny with small size",
        b: "large number of progeny with large size",
        c: "small number of progeny with small size",
        d: "small number of progeny with large size",
        correct: "a",
        answered: null
    },
    {
        question: "Animals that can move from fresh water to sea called as.....",
        a: "Stenothermal",
        b: "Eurythermal",
        c: "Catadromous",
        d: "Anadromous",
        correct: "c",
        answered: null
    },
    {
        question: "Some organisms are able to maintain homeostasis by physical means ...",
        a: "Conform",
        b: "Regulate",
        c: "Migrate",
        d: "Suspend",
        correct: "b",
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
