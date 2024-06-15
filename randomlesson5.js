// quiz.js

const quizData = [
    {
        question: "Hershey and Chase experiment with bacteriophage showed that",
        a: "Protein gets into the bacterial cells",
        b: "DNA is the genetic material",
        c: "DNA contains radioactive sulphur",
        d: "Viruses undergo transformation",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "DNA and RNA are similar with respect to",
        a: "Thymine as a nitrogen base",
        b: "A single-stranded helix shape",
        c: "Nucleotide containing sugars, nitrogen bases and phosphates",
        d: "The same sequence of nucleotides for the amino acid phenyl alanine",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "A mRNA molecule is produced by",
        a: "Replication",
        b: "Transcription",
        c: "Duplication",
        d: "Translation",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The total number of nitrogenous bases in human genome is estimated to be about",
        a: "3.5 million",
        b: "35000",
        c: "35 million",
        d: "3.1 billion",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "E. coli cell grown on 15N medium are transferred to 14N medium and allowed to grow for two generations. DNA extracted from these cells is ultracentrifuged in a cesium chloride density gradient. What density distribution of DNA would you expect in this experiment?",
        a: "One high and one low density band.",
        b: "One intermediate density band.",
        c: "One high and one intermediate density band.",
        d: "One low and one intermediate density band.",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "What is the basis for the difference in the synthesis of the leading and lagging strand of DNA molecules?",
        a: "Origin of replication occurs only at the 5' end of the molecules.",
        b: "DNA ligase works only in the 3' → 5' direction.",
        c: "DNA polymerase can join new nucleotides only to the 3' end of the growing stand.",
        d: "Helicases and single-strand binding proteins that work at the 5' end.",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following is the correct sequence of event with reference to the central dogma?",
        a: "Transcription, Translation, Replication",
        b: "Transcription, Replication, Translation",
        c: "Duplication, Translation, Transcription",
        d: "Replication, Transcription, Translation",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following statements about DNA replication is not correct?",
        a: "Unwinding of DNA molecule occurs as hydrogen bonds break.",
        b: "Replication occurs as each base is paired with another exactly like it.",
        c: "Process is known as semi conservative replication because one old strand is conserved in the new molecule.",
        d: "Complementary base pairs are held together with hydrogen bonds.",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Which of the following statements is not true about DNA replication in eukaryotes?",
        a: "Replication begins at a single origin of replication.",
        b: "Replication is bidirectional from the origins.",
        c: "Replication occurs at about 1 million base pairs per minute.",
        d: "There are numerous different bacterial chromosomes, with replication ocurring in each at the same time.",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "The first codon to be deciphered was ________ which codes for ________.",
        a: "AAA, proline",
        b: "GGG, alanine",
        c: "UUU, Phenylalanine",
        d: "TTT, arginine",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Meselson and Stahl’s experiment proved",
        a: "Transduction",
        b: "Transformation",
        c: "DNA is the genetic material",
        d: "Semi-conservative nature of DNA replication",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "Ribosomes are composed of two subunits; the smaller subunit of a ribosome has a binding site for _________ and the larger subunit has two binding sites for two _________. (mRNA, tRNA)",
        a: "mRNA; tRNA",
        b: "tRNA; mRNA",
        c: "mRNA; mRNA",
        d: "tRNA; tRNA",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "An operon is a:",
        a: "Protein that suppresses gene expression",
        b: "Protein that accelerates gene expression",
        c: "Cluster of structural genes with related function",
        d: "Gene that switches other genes on or off",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "When lactose is present in the culture medium:",
        a: "Transcription of lac y, lac z, lac a genes occurs.",
        b: "Repressor is unable to bind to the operator.",
        c: "Repressor is able to bind to the operator.",
        d: "Both (a) and (b) are correct.",
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
