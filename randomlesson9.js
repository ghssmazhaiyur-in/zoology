// quiz.js

const quizData = [
    {
        question: "The first clinical gene therapy was done for the treatment of",
        a: "AIDS",
        b: "Cancer",
        c: "Cystic fibrosis",
        d: "SCID",
        correct: "d",
        answered: null
    },
    {
        question: "Dolly, the sheep was obtained by a technique known as",
        a: "Cloning by gene transfer",
        b: "Cloning without the help of gametes",
        c: "Cloning by tissue culture of somatic cells",
        d: "Cloning by nuclear transfer",
        correct: "d",
        answered: null
    },
    {
        question: "The genetic defect adenosine deaminase deficiency may be cured permanently by",
        a: "Enzyme replacement therapy",
        b: "Periodic infusion of genetically engineered lymphocytes having ADA cDNA",
        c: "Administering adenosine deaminase activators",
        d: "Introducing bone marrow cells producing ADA into embryo at an early stage of development",
        correct: "d",
        answered: null
    },
    {
        question: "How many amino acids are arranged in the two chains of Insulin?",
        a: "Chain A has 12 and Chain B has 13 amino acids",
        b: "Chain A has 21 and Chain B has 30 amino acids",
        c: "Chain A has 20 and chain B has 30 amino acids",
        d: "Chain A has 12 and chain B has 20 amino acids",
        correct: "b",
        answered: null
    },
    {
        question: "PCR proceeds in three distinct steps governed by temperature, they are in order of",
        a: "Denaturation, Annealing, Synthesis",
        b: "Synthesis, Annealing, Denaturation",
        c: "Annealing, Synthesis, Denaturation",
        d: "Denaturation, Synthesis, Annealing",
        correct: "a",
        answered: null
    },
    {
        question: "Which one of the following statements is true regarding DNA polymerase used in PCR?",
        a: "It is used to ligate introduced DNA in recipient cells",
        b: "It serves as a selectable marker",
        c: "It is isolated from a Virus",
        d: "It remains active at a high temperature",
        correct: "d",
        answered: null
    },
    {
        question: "ELISA is mainly used for",
        a: "Detection of mutations",
        b: "Detection of pathogens",
        c: "Selecting animals having desired traits",
        d: "Selecting plants having desired traits",
        correct: "b",
        answered: null
    },
    {
        question: "Transgenic animals are those which have",
        a: "Foreign DNA in some of their cells",
        b: "Foreign DNA in all their cells",
        c: "Foreign RNA in some of their cells",
        d: "Foreign RNA in all their cells",
        correct: "b",
        answered: null
    },
    {
        question: "Vaccines that use components of a pathogenic organism rather than the whole organism are called",
        a: "Subunit recombinant vaccines",
        b: "Attenuated recombinant vaccines",
        c: "DNA vaccines",
        d: "Conventional vaccines",
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
