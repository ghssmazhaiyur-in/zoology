// quiz.js

const quizData = [
    {
        question: "A 30 year old woman has bleedy diarrhoea for the past 14 hours, which one of the following organisms is likely to cause this illness?",
        a: "Streptococcus pyogens",
        b: "Clostridium difficile",
        c: "Shigella dysenteriae",
        d: "Salmonella enteritidis",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Exo-erythrocytic schizogony of Plasmodium takes place in -------",
        a: "RBC",
        b: "Leucocytes",
        c: "Stomach",
        d: "Liver",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "The sporozoites of Plasmodium vivax are formed from ------------",
        a: "Gametocytes",
        b: "Sporoblasts",
        c: "Oocysts",
        d: "Spores",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Amphetamines are stimulants of the CNS, whereas barbiturates are ----",
        a: "CNS stimulant",
        b: "both a and b",
        c: "hallucinogenic",
        d: "CNS depressants",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "Choose the correctly match pair.",
        a: "Amphetamines - Stimulant",
        b: "LSD - Narcotic",
        c: "Heroin - Psychotropic",
        d: "Benzodiazepine - Pain killer",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "The Athlete’s foot disease in human is caused by-------",
        a: "Bacteria",
        b: "Fungi",
        c: "Virus",
        d: "Protozoan",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Cirrhosis of liver is caused by chronic intake of ------",
        a: "Opium",
        b: "Alcohol",
        c: "Tobacco",
        d: "Cocaine",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The sporozoite of the malarial parasite is present in ----",
        a: "saliva of infected female Anopheles mosquito.",
        b: "RBC of human suffering from malaria.",
        c: "Spleen of infected humans.",
        d: "Gut of female Anopheles mosquito.",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Match the pathogens with respective diseases caused by them and select the correct match using the codes given below.\nA. Leishmania donavani - i. Amoebiasis\nB. Wuchereria bancrofti - ii. Kala – azar\nC. Trypanosoma gambiense - iii. Sleeping sickness\nD. Entamoeba histolytica - iv. Filariasis",
        a: "A-ii, B-iv, C-iii, D-i",
        b: "A-ii, B-iv, C-i, D-iii",
        c: "A-iii, B-i, C-ii, D-iv",
        d: "A-i, B-iv, C-iii, D-ii",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Paratope is an",
        a: "Antibody binding site on variable regions",
        b: "Antibody binding site on heavy regions",
        c: "Antigen binding site on variable regions",
        d: "Antigen binding site on heavy regions",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Allergy involves",
        a: "IgE",
        b: "IgG",
        c: "lgA",
        d: "IgM",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Spread of cancerous cells to distant sites is termed as",
        a: "Metastasis",
        b: "Oncogenes",
        c: "Proto-oncogenes",
        d: "Malignant neoplasm",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "B cells that produce and release large amounts of antibody are called",
        a: "Memory cells",
        b: "Basophils",
        c: "Plasma cells",
        d: "killer cells",
        correct: "c",
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
