// quiz.js

const quizData = [
    {
        question: "Haemophilia is more common in males because it is a",
        a: "Recessive character carried by Y-chromosome",
        b: "Dominant character carried by Y-chromosome",
        c: "Dominant trait carried by X-chromosome",
        d: "Recessive trait carried by X-chromosome",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "ABO blood group in man is controlled by",
        a: "Multiple alleles",
        b: "Lethal genes",
        c: "Sex linked genes",
        d: "Y-linked genes",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Three children of a family have blood groups A, AB and B. What could be the genotypes of their parents?",
        a: "IA IA and Io Io",
        b: "IA Io and IBIo",
        c: "IB IB and IA IA",
        d: "IA Io and Io Io",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following is not correct?",
        a: "Three or more alleles of a trait in the population are called multiple alleles.",
        b: "A normal gene undergoes mutations to form many alleles.",
        c: "Multiple alleles map at different loci of a chromosome.",
        d: "A diploid organism has only two alleles out of many in the population.",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following phenotypes in the progeny are possible from the parental combination AxB?",
        a: "A and B only",
        b: "A, B and AB only",
        c: "AB only",
        d: "A, B, AB and O",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following phenotypes is not possible in the progeny of the parental genotypic combination IAIO X IAIB?",
        a: "AB",
        b: "O",
        c: "A",
        d: "B",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following is true about Rh factor in the offspring of a parental combination Dd x Dd (both Rh positive)?",
        a: "All will be Rh positive",
        b: "Half will be Rh positive",
        c: "About ¾ will be Rh negative",
        d: "About one fourth will be Rh negative",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "What can be the blood group of offspring when both parents have AB blood group?",
        a: "AB only",
        b: "A, B and AB",
        c: "A, B, AB and O",
        d: "A and B only",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "If the child's blood group is ‘O’ and father's blood group is ‘A’ and mother’s blood group is ‘B’ the genotype of the parents will be",
        a: "IA IA and IB Io",
        b: "IA Io and IB Io",
        c: "IA Io and Io Io",
        d: "Io Io and IB IB",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "XO type of sex determination and XY type of sex determination are examples of",
        a: "Male heterogamety",
        b: "Female heterogamety",
        c: "Male homogamety",
        d: "Both (b) and (c)",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "In an accident there is great loss of blood and there is no time to analyse the blood group which blood can be safely transferred?",
        a: "O and Rh negative",
        b: "O and Rh positive",
        c: "B and Rh negative",
        d: "AB and Rh positive",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Father of a child is colourblind and mother is carrier for colourblindness, the probability of the child being colourblind is",
        a: "25%",
        b: "50%",
        c: "100%",
        d: "75%",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "A marriage between a colourblind man and a normal woman produces",
        a: "All carrier daughters and normal sons",
        b: "50% carrier daughters and 50% normal daughters",
        c: "50% colourblind sons and 50% normal sons",
        d: "All carrier offspring",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Down's syndrome is a genetic disorder which is caused by the presence of an extra chromosome number",
        a: "20",
        b: "21",
        c: "4",
        d: "23",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Klinefelters’ syndrome is characterized by a karyotype of",
        a: "XYY",
        b: "XO",
        c: "XXX",
        d: "XXY",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "Females with Turner’s syndrome have",
        a: "Small uterus",
        b: "Rudimentary ovaries",
        c: "Underdeveloped breasts",
        d: "All of these",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "Patau's syndrome is also referred to as",
        a: "13-Trisomy",
        b: "18-Trisomy",
        c: "21-Trisomy",
        d: "None of these",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "“Universal Donor” and “Universal Recipients” blood group are _____ and ______ respectively",
        a: "AB, O",
        b: "O, AB",
        c: "A, B",
        d: "B, A",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "ZW-ZZ system of sex determination occurs in",
        a: "Fishes",
        b: "Reptiles",
        c: "Birds",
        d: "All of these",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Co-dominant blood group is",
        a: "A",
        b: "AB",
        c: "B",
        d: "O",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following is incorrect regarding ZW-ZZ type of sex determination?",
        a: "It occurs in birds and some reptiles",
        b: "Females are homogametic and males are heterogametic",
        c: "Males produce one type of gamete",
        d: "It occurs in gypsy moth",
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
