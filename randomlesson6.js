// quiz.js

const quizData = [
    {
        question: "The first life on earth originated",
        a: "in air",
        b: "on land",
        c: "in water",
        d: "on mountain",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Who published the book “Origin of species by Natural Selection” in 1859?",
        a: "Charles Darwin",
        b: "Lamarck",
        c: "Weismann",
        d: "Hugo de Vries",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following was the contribution of Hugo de Vries?",
        a: "Theory of mutation",
        b: "Theory of natural Selection",
        c: "Theory of inheritance of acquired characters",
        d: "Germplasm theory",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "The wings of birds and butterflies is an example of",
        a: "Adaptive radiation",
        b: "convergent evolution",
        c: "divergent evolution",
        d: "variation",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The phenomenon of “ Industrial Melanism” demonstrates",
        a: "Natural selection",
        b: "induced mutation",
        c: "reproductive isolation",
        d: "geographical isolation",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Darwin’s finches are an excellent example of",
        a: "connecting links",
        b: "seasonal migration",
        c: "adaptive radiation",
        d: "parasitism",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Who proposed the Germplasm theory?",
        a: "Darwin",
        b: "August Weismann",
        c: "Lamarck",
        d: "Alfred Wallace",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The age of fossils can be determined by",
        a: "electron microscope",
        b: "weighing the fossils",
        c: "carbon dating",
        d: "analysis of bones",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Fossils are generally found in",
        a: "igneous rocks",
        b: "metamorphic rocks",
        c: "volcanic rocks",
        d: "sedimentary rocks",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "Evolutionary history of an organism is called",
        a: "ancestry",
        b: "ontogeny",
        c: "phylogeny",
        d: "paleontology",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "The golden age of reptiles was",
        a: "Mesozoic era",
        b: "Cenozoic era",
        c: "Paleozoic era",
        d: "Proterozoic era",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Which period was called “Age of fishes”?",
        a: "Permian",
        b: "Triassic",
        c: "Devonian",
        d: "Ordovician",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Modern man belongs to which period?",
        a: "Quaternary",
        b: "Cretaceous",
        c: "Silurian",
        d: "Cambrian",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "The Neanderthal man had the brain capacity of",
        a: "650 – 800cc",
        b: "1200cc",
        c: "900cc",
        d: "1400cc",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "According to Darwin, the organic evolution is due to",
        a: "Intraspecific competition",
        b: "Interspecific competition",
        c: "Competition within closely related species.",
        d: "Reduced feeding efficiency in one species due to the presence of interfering species.",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "A population will not exist in Hardy-Weinberg equilibrium if",
        a: "Individuals mate selectively",
        b: "There are no mutations",
        c: "There is no migration",
        d: "The population is large",
        correct: "a",
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
