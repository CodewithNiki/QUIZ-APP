const open = document.querySelector(".question__starter");
const questionContainer = document.querySelector(".question__container");
const minCountDown = document.querySelector("#minute");
const secCountDown = document.querySelector("#second");
const question = document.querySelector(".question__container--area__question");
const questionNum = document.querySelector(".question__container--header span");
const answerChoices = document.querySelectorAll(
  ".question__container--area__answer li"
);
const answerChoiceA = document.querySelector(".choiceA");
const answerChoiceB = document.querySelector(".choiceB");
const answerChoiceC = document.querySelector(".choiceC");
const answerChoiceD = document.querySelector(".choiceD");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const submit = document.querySelector(".submit");
const resultContainer = document.querySelector(".question__result");
const resultScore = document.querySelector(".question__result div");
const questionReload = document.querySelector(".question__result button");

let [millisec, sec, min] = [0, 60, 9];
let activeQuestion = 0;
let score = 0;
let num = 1;

let questions = [
  {
    question:
      "A group of market women sell at least one of yam, plantain and maize. 12 of them sell maize, 10 sell yam and 14 sell plantain. 5 sell plantain and maize, 4 sell yam and maize, 2 sell yam and plantain only while 3 sell all the three items. How many women are in the group?",
    choiceA: "25",
    choiceB: "19",
    choiceC: "18",
    choiceD: "17",
    correctAnswer: "25",
  },
  {
    question:
      "The first term of a geometric progression is twice its common ratio. Find the sum of the first two terms of the G.P if its sum to infinity is 8.",
    choiceA: "8/5",
    choiceB: "8/3",
    choiceC: "72/25",
    choiceD: "56/9",
    correctAnswer: "72/25",
  },
  {
    question:
      "If log 10 to base 8 = X, evaluate log 5 to base 8 in terms of X.",
    choiceA: "X/2",
    choiceB: "-X/4",
    choiceC: "-X/3",
    choiceD: "-X/2",
    correctAnswer: "-X/3",
  },
  {
    question:
      "Let P = {1, 2, u, v, w, x}; Q = {2, 3, u, v, w, 5, 6, y} and R = {2, 3, 4, v, x, y}.",
    choiceA: "{1, x}",
    choiceB: "{x, y}",
    choiceC: "{x}",
    choiceD: "{ɸ}",
    correctAnswer: "{x}",
  },
  {
    question:
      "If the population of a town was 240,000 in January 1998 and it increased by 2% each year, what would be the population of the town in January, 2000?",
    choiceA: "480,000 ",
    choiceB: "249,696 ",
    choiceC: "249,600 ",
    choiceD: "244,800",
    correctAnswer: "249,696",
  },
  {
    question:
      "An equilateral triangle of side √3cm is inscribed in a circle. Find the radius of the circle.",
    choiceA: " 2/3 cm ",
    choiceB: "2 cm",
    choiceC: "1 cm",
    choiceD: "3 cm",
    correctAnswer: "1 cm",
  },
  {
    question:
      "In a regular polygon, each interior angle doubles its corresponding exterior angle. Find the number of sides of the polygon.",
    choiceA: "8",
    choiceB: "6",
    choiceC: "4",
    choiceD: "3",
    correctAnswer: "6",
  },
  {
    question: "In how many ways can the word MATHEMATICS be arranged?",
    choiceA: "11!/(9! 2!)",
    choiceB: "11!/(9! 2! 2!)",
    choiceC: "11!/(2! 2! 2!)",
    choiceD: "11!/(2! 2!)",
    correctAnswer: "11!/(2! 2! 2!)",
  },
  {
    question:
      "Find the tangent to the acute angle between the lines 2x + y = 3 and 3x - 2y = 5.",
    choiceA: "-74 ",
    choiceB: "7/8",
    choiceC: "7/4",
    choiceD: "7/2",
    correctAnswer: "7/4",
  },
  {
    question:
      "If the mean of the numbers 0, (x+2), (3x+6), and (4x+8) is 4, find their mean deviation.",
    choiceA: "0",
    choiceB: "2",
    choiceC: "3",
    choiceD: "4",
    correctAnswer: "3",
  },
];
let lastQuestion = questions.length - 1;

open.addEventListener("click", () => {
  open.classList.add("open");
  questionContainer.style.display = "flex";
  minCountDown.innerHTML = "10";
  secCountDown.innerHTML = "00";

  setInterval(countDown, 10);
  showQuestion();
});

next.addEventListener("click", () => {
  showQuestionIncrease();
  hide([answerChoiceA,answerChoiceB, answerChoiceC, answerChoiceD])
});

prev.addEventListener("click", () => {
  showQuestionDecrease();
});

submit.addEventListener("click", () => {
  showResult();
});

answerChoiceA.addEventListener("click", (e)=>{
  show(answerChoiceA);
  hide([answerChoiceB, answerChoiceC, answerChoiceD]);
  let userAnswer = questions[activeQuestion].choiceA;
  checkAnswer(userAnswer);
});
answerChoiceB.addEventListener("click", ()=>{
  show(answerChoiceB);
  hide([answerChoiceA, answerChoiceC, answerChoiceD]);
  let userAnswer = questions[activeQuestion].choiceB;
  checkAnswer(userAnswer);
});
answerChoiceC.addEventListener("click", ()=>{
  show(answerChoiceC);
  hide([answerChoiceA, answerChoiceB, answerChoiceD]);
  let userAnswer = questions[activeQuestion].choiceC;
  checkAnswer(userAnswer);
});
answerChoiceD.addEventListener("click", ()=>{
  show(answerChoiceD);
  hide([answerChoiceA, answerChoiceB, answerChoiceC]);
  let userAnswer = questions[activeQuestion].choiceD;
  checkAnswer(userAnswer);
});

questionReload.addEventListener("click",()=>{
  location.reload();
})

function show(element){
  element.style.backgroundColor = "rgb(11, 83, 76)";
}

function hide(elements){
  elements.forEach((element) => {
    element.style.backgroundColor = "transparent"
  });
}

function countDown() {
  millisec++;
  if (millisec > 99) {
    sec--;
    secCountDown.innerHTML = sec;
    minCountDown.innerHTML = "0" + min;
    millisec = 0;
  }
  if (sec < 10) {
    secCountDown.innerHTML = "0" + sec;
  }
  if (sec < 0) {
    min--;
    minCountDown.innerHTML = "0" + min;
    secCountDown.innerHTML = "59";
    sec = 60;
  }
  if (min < 0){
    showResult();
  }
}

function showQuestion() {
  let q = questions[activeQuestion];

  question.innerHTML = q.question;
  answerChoiceA.innerHTML = q.choiceA;
  answerChoiceB.innerHTML = q.choiceB;
  answerChoiceC.innerHTML = q.choiceC;
  answerChoiceD.innerHTML = q.choiceD;
}

function showQuestionIncrease() {
  if (activeQuestion < lastQuestion) {
    activeQuestion++;
    questionNum.innerHTML = "0" + (activeQuestion + 1);
    if(activeQuestion > questions.length-2){
      questionNum.innerHTML = activeQuestion + 1;
    }
    showQuestion();
  }
}

function showQuestionDecrease() {
  if (activeQuestion > 0) {
    activeQuestion--;
    questionNum.innerHTML = "0" + (activeQuestion + 1);
    showQuestion();
  }
}

function checkAnswer(answer) {
  if (answer === questions[activeQuestion].correctAnswer) {
    score = activeQuestion + 1;
  }
  
  else{
    score = 0;
  }
}

function showResult() {
  resultContainer.style.display = "flex";
  questionContainer.style.display = "none";
  resultScore.innerHTML = `Your score is ${score}/` + questions.length;
}