//this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
 const questions = [
    {
        question: "Onde se utiliza o Python?",
        optionA: "Para acessar website",
        optionB: "Criar aplicativos",
        optionC: "Entrar no Free Fire",
        optionD: "Criação de websites",
        correctOption: "optionD"
    },

    {
        question: "Qual a primeira linguagem de programação inventada?",
        optionA: "Cobol",
        optionB: "Plankalkül",
        optionC: "Simula",
        optionD: "Prolong",
        correctOption: "optionB"
    },

    {
        question: "Quem criou o PHP",
        optionA: "Donald Trump",
        optionB: "James Gosling",
        optionC: "Brendan Eich",
        optionD: "Rasmus Lerdorf",
        correctOption: "optionD"
    },

    {
        question: "Chave '{' é na mesma linha da declaração de função ou embaixo?",
        optionA: "Encima",
        optionB: "Embaixo",
        optionC: "Mesma linha",
        optionD: "Depende da linguagem",
        correctOption: "optionD"
    },

    {
        question: "Qual é a linguagem de programação mais utilizada para o desenvolvimento de aplicativos Android?",
        optionA: "Python",
        optionB: "C++",
        optionC: "Ruby",
        optionD: "Java",
        correctOption: "optionD"
    },

    {
        question: "Qual linguagem de programação foi inspirada por uma revista em quadrinhos chamada “The Flying Spaghetti Monster”?",
        optionA: "LOLCODE",
        optionB: "Brainfuck",
        optionC: "Malbolge",
        optionD: "Whitespace",
        correctOption: "optionA"
    },

    {
        question: "Qual linguagem de programação foi projetada para ser usada em páginas web dinâmicas e é frequentemente incorporada ao HTML?",
        optionA: "JavaScript",
        optionB: "CSS",
        optionC: " PHP",
        optionD: "TypeScript",
        correctOption: "optionC"
    },

    {
        question: "Em que linguagem de programação são escritas as extensões do navegador Google Chrome?",
        optionA: "JavaScript",
        optionB: "C++",
        optionC: "Python",
        optionD: "Java",
        correctOption: "optionA"
    },

    {
        question: "Qual dos seguintes sistemas de controle de versão é amplamente utilizado na indústria de desenvolvimento de software?",
        optionA: "Dropbox",
        optionB: "BitTorrent",
        optionC: "SSH",
        optionD: "Git",
        correctOption: "optionD"
    },

    {
        question: `Qual dos seguintes não é um paradigma de programação?`,
        optionA: "Programação Orientada a Objetos",
        optionB: "Programação Funcional",
        optionC: "Programação Imperativa",
        optionD: "Programação de Banco de Dados",
        correctOption: "optionD"
    }

]


let shuffledQuestions = []

function handleQuestions() { 

    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0 
let wrongAttempt = 0 
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Péssimo desempenho, estude mais, beta."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Rázoavel, procure melhorar, semi beta."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Muito bom, sigma."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}