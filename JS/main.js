import bridge from '@vkontakte/vk-bridge';

// Отправляет событие нативному клиенту на инициализацию приложения
bridge.send("VKWebAppInit", {});
const quizData = [
    {
        question: "Год рождения Макса Коржа?",
        a: "1988 г.",
        b: "1999 г.",
        c: "1979 г.",
        correct: "a",
    },
    {
        question: "Сколько подписчиков у Макса Коржа?",
        a: "1,8 млн",
        b: "3 млн",
        c: "2,7 млн",
        correct: "c",
    },
    {
        question: "Сколько детей у Макса Коржа?",
        a: "1",
        b: "2",
        c: "3",
        correct: "b",
    },
    {
        question: "Где родился Макс Корж?",
        a: "г. Москва",
        b: "г. Лунинец",
        c: "г. Владивосток",
        correct: "b",
    },
    {
        question: "В какой стране радился Макс Корж?",
        a: "Белорусская ССР",
        b: "СССР",
        c: "Белоруссия",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz(){
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
}

function deselectAnswers(){
    answerElements.forEach(answerEl => answerEl.checked = false)
}

function getSelected(){
    let answer;

    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

submit.addEventListener('click', () => {
    const answer = getSelected();

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length){
            loadQuiz();
        }
        else{
            score = score/quizData.length*100;
            quiz.innerHTML = `<h2 align="center" style="color:#A9A9A9;font-size: 21px;">вы были правы на:</h2>
            <p>${score}%</p>
            <h2 align="center" style="color:#A9A9A9;font-size: 21px;">Забери свой подарок на сайте</h2>
            <p align="center" style="color:yellow; border: 4px solid yellow;border-radius: 15px;width:300px;margin-left: auto;margin-right: auto;padding-top: 6px;padding-bottom: 6px;"><a href="https://free1krub.taplink.ws/">ПЕРЕЙТИ НА САЙТ</a></p>
            <br>;
            
            `;
        }
    }
});

