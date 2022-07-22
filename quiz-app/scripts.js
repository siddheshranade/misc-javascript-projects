/* I. Constants */

const quizData = [
    {
        question: 'What is this website\'s developer\'s name?',
        a: 'Siddhesh',
        b: 'Aakash',
        c: 'Aneesh',
        d: 'Shreeya',
        correct: 'a'
    },
    {
        question: 'Who won the last FIFA World Cup?',
        a: 'Germany',
        b: 'Brazil',
        c: 'France',
        d: 'Trinidad and Tobago',
        correct: 'c'
    },
    {
        question: 'What does HTML stand for?',
        a: 'Hello to my llama',
        b: 'Hypertext markup language',
        c: 'His tea melted long ago',
        d: 'None of the above',
        correct: 'b'
    }
];

let quizQuestionIndex = 0;
let score = 0;

/* II. Page load events */

const quizContainerEl = document.querySelector('#quiz-container');
const submitButtonEl = document.querySelector('#submit-button');
const questionEl = document.querySelector('#question');
const optionA = document.querySelector('#a-text');
const optionB = document.querySelector('#b-text');
const optionC = document.querySelector('#c-text');
const optionD = document.querySelector('#d-text');
let options = document.querySelectorAll('input[name="quiz"]');
submitButtonEl.addEventListener('click', handleQuizSubmit);

renderQuestion(0);

/* III. Function definitions */

function renderQuestion(index) {
    // if (index >= quizData.length) {
    //     renderFinalScreen();
    //     return;
    // }

    let currentQ = quizData[index];

    questionEl.innerHTML = currentQ.question;
    optionA.innerHTML = currentQ.a;
    optionB.innerHTML = currentQ.b;
    optionC.innerHTML = currentQ.c;
    optionD.innerHTML = currentQ.d;
}

function handleQuizSubmit(e) {
    let answer = getAnswer();

    if (!answer) return;

    let currentQuestion = quizData[quizQuestionIndex];
    if (answer === currentQuestion['correct']) {
        score++;
    }

    quizQuestionIndex++;
    if (quizQuestionIndex < quizData.length) {
        renderQuestion(quizQuestionIndex);
    } else {
        renderFinalScreen();
    }
}

function getAnswer() {
    let answer;
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            answer = options[i].value;
        }
    }

    return answer;
}

function renderFinalScreen() {
    quizContainerEl.innerHTML =
        `
        <p>You\'re done with the quiz!</p>
        <p>Your total score was ${score} out of 3.</p>
        `;
}