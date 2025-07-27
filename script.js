const colors = [
  {name: "Red", hex: "#E94560"},
  {name: "Blue", hex: "#1B98F5"},
  {name: "Green", hex: "#3CD070"},
  {name: "Purple", hex: "#9D4EDD"},
  {name: "Orange", hex: "#FFA500"},
  {name: "Pink", hex: "#FF61A6"},
  {name: "Yellow", hex: "#FFDE59"},
  {name: "Teal", hex: "#12CBC4"},
];

let gameScore = 0, timerValue = 60, timerInterval, currentAnswer;

const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const optionsDiv = document.getElementById('options');
const colorWord = document.getElementById('color-word');
const resultDiv = document.getElementById('result');
const correctAudio = document.getElementById('correct-audio');
const wrongAudio = document.getElementById('wrong-audio');

startBtn.onclick = startGame;

function startGame() {
  gameScore = 0;
  timerValue = 60;
  scoreEl.textContent = `Score: ${gameScore}`;
  timerEl.textContent = '60s';
  startBtn.style.display = 'none';
  resultDiv.textContent = '';
  optionsDiv.innerHTML = '';
  colorWord.textContent = '';
  nextQuestion();
  timerInterval = setInterval(() => {
    timerValue--;
    timerEl.textContent = `${timerValue}s`;
    if (timerValue <= 0) endGame();
  }, 1000);
}

function nextQuestion() {
  optionsDiv.innerHTML = '';
  let correctColor = colors[Math.floor(Math.random() * colors.length)];
  let wordColor = colors[Math.floor(Math.random() * colors.length)];
  // Avoid identical word and color
  while (correctColor.name === wordColor.name) {
    wordColor = colors[Math.floor(Math.random() * colors.length)];
  }
  colorWord.textContent = wordColor.name;
  colorWord.style.color = correctColor.hex;
  currentAnswer = correctColor.name;
  let answers = [correctColor];
  while (answers.length < 4) {
    let opt = colors[Math.floor(Math.random() * colors.length)];
    if (!answers.some(a => a.name === opt.name)) answers.push(opt);
  }
  answers = shuffle(answers);
  answers.forEach(opt => {
    let btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.name;
    btn.onclick = () => handleAnswer(opt.name);
    optionsDiv.appendChild(btn);
  });
}

function handleAnswer(choice) {
  if (choice === currentAnswer) {
    gameScore++;
    scoreEl.textContent = `Score: ${gameScore}`;
    correctAudio.currentTime = 0;
    correctAudio.play();
    resultDiv.textContent = "Correct!";
    resultDiv.style.color = "#3CD070";
  } else {
    wrongAudio.currentTime = 0;
    wrongAudio.play();
    resultDiv.textContent = "Wrong!";
    resultDiv.style.color = "#E94560";
  }
  setTimeout(() => {
    resultDiv.textContent = '';
    if (timerValue > 0) nextQuestion();
  }, 550);
}

function endGame() {
  clearInterval(timerInterval);
  optionsDiv.innerHTML = '';
  colorWord.textContent = 'Game Over!';
  resultDiv.textContent = `Final Score: ${gameScore}`;
  resultDiv.style.color = '#6A4C93';
  setTimeout(() => startBtn.style.display = 'block', 700);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
