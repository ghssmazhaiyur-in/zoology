// quiz.js

const quizData = [
    {
        question: "The mature sperms are stored in the",
        a: "Seminiferous tubules",
        b: "Vas deferens",
        c: "Epididymis",
        d: "Seminal vesicle",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "The male sex hormone testosterone is secreted from",
        a: "Sertoli cells",
        b: "Leydig cell",
        c: "Epididymis",
        d: "Prostate gland",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The glandular accessory organ which produces the largest proportion of semen is",
        a: "Seminal vesicle",
        b: "Bulbourethral gland",
        c: "Prostate gland",
        d: "Mucous gland",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "The male homologue of the female clitoris is",
        a: "Scrotum",
        b: "Penis",
        c: "Urethra",
        d: "Testis",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The site of embryo implantation is the",
        a: "Uterus",
        b: "Peritoneal cavity",
        c: "Vagina",
        d: "Fallopian tube",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "The foetal membrane that forms the basis of the umbilical cord is",
        a: "Allantois",
        b: "Amnion",
        c: "Chorion",
        d: "Yolk sac",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "The most important hormone in initiating and maintaining lactation after birth is",
        a: "Oestrogen",
        b: "FSH",
        c: "Prolactin",
        d: "Oxytocin",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Mammalian egg is",
        a: "Mesolecithal and non cleidoic",
        b: "Microlecithal and non cleidoic",
        c: "Alecithal and non cleidoic",
        d: "Alecithal and cleidoic",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "The process which the sperm undergoes before penetrating the ovum is",
        a: "Spermiation",
        b: "Cortical reaction",
        c: "Spermiogenesis",
        d: "Capacitation",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "The milk secreted by the mammary glands soon after child birth is called",
        a: "Mucous",
        b: "Colostrum",
        c: "Lactose",
        d: "Sucrose",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Colostrum is rich in",
        a: "Ig E",
        b: "Ig A",
        c: "Ig D",
        d: "Ig M",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The Androgen Binding Protein (ABP) is produced by",
        a: "Leydig cells",
        b: "Hypothalamus",
        c: "Sertoli cells",
        d: "Pituitary gland",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Find the wrongly matched pair",
        a: "Bleeding phase - fall in oestrogen and progesterone",
        b: "Follicular phase - rise in oestrogen",
        c: "Luteal phase - rise in FSH level",
        d: "Ovulatory phase - LH surge",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "Assertion (A) and Reason (R)",
        a: "A – In human male, testes are extra abdominal and lie in scrotal sacs. R – Scrotum acts as thermoregulator and keeps temperature lower by 2oC for normal sperm production.",
        b: "A – Ovulation is the release of ovum from the Graafian follicle. R – It occurs during the follicular phase of the menstrual cycle.",
        c: "A – Head of the sperm consists of acrosome and mitochondria. R – Acrosome contains spiral rows of mitochondria.",
        d: "Both A and R are false",
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
