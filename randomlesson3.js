// quiz.js

const quizData = [
    {
        question: "Which of the following is correct regarding HIV, hepatitis B, gonorrhoea and trichomoniasis?",
        a: "Gonorrhoea is a STD whereas others are not.",
        b: "Trichomoniasis is a viral disease whereas others are bacterial.",
        c: "HIV is a pathogen whereas others are diseases.",
        d: "Hepatitis B is eradicated completely whereas others are not.",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Which one of the following groups includes sexually transmitted diseases caused by bacteria only?",
        a: "Syphilis, gonorrhoea and candidiasis",
        b: "Syphilis, chlamydiasis and gonorrhoea",
        c: "Syphilis, gonorrhoea and trichomoniasis",
        d: "Syphilis, trichomoniasis and pediculosis",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Identify the correct statements from the following",
        a: "Chlamydiasis is a viral disease.",
        b: "Gonorrhoea is caused by a spirochaete bacterium, Treponema palladium.",
        c: "The incubation period for syphilis is 2 to 14 days in males and 7 to 21 days in females.",
        d: "Both syphilis and gonorrhoea are easily cured with antibiotics.",
        correct: "c",
        answered: null // Initialize answered property
    },
    {
        question: "A contraceptive pill prevents ovulation by",
        a: "blocking fallopian tube",
        b: "inhibiting release of FSH and LH",
        c: "stimulating release of FSH and LH",
        d: "causing immediate degeneration of released ovum",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "The approach which does not give the defined action of contraceptive is",
        a: "Hormonal contraceptive: Prevents entry of sperms, prevent ovulation and fertilization",
        b: "Vasectomy: Prevents spermatogenesis",
        c: "Barrier method: Prevents fertilization",
        d: "Intrauterine device: Increases phagocytosis of sperms, suppresses sperm motility and fertilizing capacity of sperms",
        correct: "d",
        answered: null // Initialize answered property
    },
    {
        question: "Read the given statements and select the correct option. Statement 1: Diaphragms, cervical caps and vaults are made of rubber and are inserted into the female reproductive tract to cover the cervix before coitus. Statement 2: They are chemical barriers of conception and are reusable.",
        a: "Both statements 1 and 2 are correct and statement 2 is the correct explanation of statement 1.",
        b: "Both statements 1 and 2 are correct but statement 2 is not the correct explanation of statement 1.",
        c: "Statement 1 is correct but statement 2 is incorrect.",
        d: "Both statements 1 and 2 are incorrect.",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Match column I with column II and select the correct option from the codes given below. Column I Column II A. Copper releasing IUD (i) LNG-20 B. Hormone releasing (ii) Lippes loop IUD C. Non medicated IUD (iii) Saheli D. Mini pills (iv) Multiload-375",
        a: "A-(iv), B-(ii), C-(i), D-(iii)",
        b: "A-(iv), B-(i), C-(iii), D-(ii)",
        c: "A-(i), B-(iv), C-(ii), D-(iii)",
        d: "A-(iv), B-(i), C-(ii), D-(iii)",
        correct: "b",
        answered: null // Initialize answered property
    },
    {
        question: "Select the incorrect action of hormonal contraceptive pills from the following",
        a: "Inhibition of spermatogenesis.",
        b: "Inhibition of ovulation.",
        c: "Changes in cervical mucus impairing its ability to allow passage and transport of sperms.",
        d: "Alteration in uterine endometrium to make it unsuitable for implantation.",
        correct: "a",
        answered: null // Initialize answered property
    },
    {
        question: "Correct the following statements",
        a: "Transfer of an ovum collected from donor into the fallopian tube is called ZIFT.",
        b: "Transferring of an embryo with more than 8 blastomeres into uterus is called GIFT.",
        c: "Multiload 375 is a hormone releasing IUD.",
        correct: "b",
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
