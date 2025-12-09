const getRandomNum = ({
  min = 0,
  max = 10,
  inclusive = true,
  whole = true,
} = {}) => {
  const inclusiveAdjustment = inclusive ? 1 : 0
  const result = Math.random() * (max - min + inclusiveAdjustment)
  return whole ? Math.floor(result) + min : result + min
}

const gameTimer = op => {
  let sec = 30;
  const timer = setInterval(() => {
    document.getElementById('timer').innerHTML = sec
    sec--
    if (sec < 0) {
      clearInterval(timer)
      buildResult(op)
    }
  }, 1000);
}

const buildResult = op => {
  const operationDisplay2 = document.getElementById('operation-display2')
  const game = document.getElementById('math-game')
  const result = document.getElementById('game-result')
  const finalScoreDisplay = document.getElementById('final-score')
  const finalScore = document.getElementById('score')
  const playAgain = document.getElementById('play-again') 
  const setup = document.getElementById('setup-form')

  game.style.display = "none"
  result.style.display = "block"
  operationDisplay2.innerHTML = op
  finalScoreDisplay.innerHTML = finalScore.innerHTML

  playAgain.addEventListener('click', () => {
    setup.style.display = "block"
    result.style.display = "none"
  })
}

const buildGame = op => {
  const operationDisplay = document.getElementById("operation-display")
  const question = document.getElementById("question")
  const userAnswer = document.getElementById("answer")
  userAnswer.focus()

  const numA = getRandomNum({ min: 1 })
  const numB = getRandomNum()
  const numBigger = getRandomNum({ min: numB })
  let answer = 0
  const multAnswer = numA * numB

  operationDisplay.innerHTML = op

  switch (op) {
    case "addition":
      answer = numA + numB
      question.innerHTML = `${numA} + ${numB}`
      break
    case "subtraction":
      answer = numBigger - numB
      question.innerHTML = `${numBigger} - ${numB}`
      break
    case "multiplication":
      answer = multAnswer
      question.innerHTML = `${numA} * ${numB}`
      break
    case "division":
      answer = multAnswer / numA
      question.innerHTML = `${multAnswer} / ${numA}`
      break
  }
  return answer
}

window.addEventListener("load", e => {
  const go = document.getElementById("go-button")
  const game = document.getElementById("math-game")
  const setup = document.getElementById("setup-form")
  const userAnswer = document.getElementById("answer")
  const operationSelect = document.getElementById("operation")
  const scoreDisplay = document.getElementById("score")
  const numButtons = document.getElementById("num-buttons")
  let operation = ""
  let answer = 0
  let score = 0

  go.addEventListener("click", () => {
    document.getElementById("timer").innerHTML = 30
    answer = 0
    score = 0
    userAnswer.value = ""
    scoreDisplay.innerHTML = score
    operation = operationSelect.value
    setup.style.display = "none"
    game.style.display = "block"
    answer = buildGame(operation)
    gameTimer(operation)
  })

  userAnswer.addEventListener("input", () => {
    checkAnswer(answer)
  })

  const buttons = Array.from(numButtons.getElementsByClassName("btn"))
  buttons.forEach(btn => {
    if (btn.value == "clear") {
      return
    }
    const btnName = "btn" + btn.value
    const btnItem = document.getElementById(btnName)
    btnItem.addEventListener("click", () => {
      userAnswer.value = userAnswer.value + btn.value
      checkAnswer(answer)
    })
  })
  clear.addEventListener("click", () => {
    userAnswer.value = ""
  })

  const checkAnswer = () => {
    if (Number(userAnswer.value) == answer) {
      score++
      scoreDisplay.innerHTML = score
      userAnswer.style.backgroundColor = "lime"
      setTimeout(() => {
        userAnswer.style.backgroundColor = "white"
        userAnswer.value = ""
        userAnswer.focus()
        answer = buildGame(operationSelect.value)
      }, 500)
    }
  }
})