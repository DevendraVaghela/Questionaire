const questions = [
    {
        question : "What's your favourite food?",
        options : ["Momos", "Pizza", "Biryani"]
    },
    {
        question : "How chaotic are you today?",
        options : ["Completely Normal", "Mildly concerning", "Someone should probably stop me"]
    },
    {
        question : "What's your current mood?",
        options : ["Good", "Existing", "Don't ask"]
    },
    {
        question : "This one is important. Someone asks you to get momos.",
        options : ["Obviously yes", "I'll think about it", "Most probably no"]
    },
    {
        question : "What do you want the engine to suggest?",
        options : ["Momos", "Stay in room", "Think about it"]
    }
];

const answers = {};

const analysisMessage = [
    ["Analysing responses...", 1500],
    ["Processing questionable decisions...", 1200],
    ["Consulting 3 highly qualified idiots...", 1800],
    ["One of them suggested Momos...", 1200],
    ["Running advanced calculations...", 1500],
    ["Calculation failed...", 1000],
    ["Trying again...", 1200],
    ["Okay, we have a result.", 1500]
];

const container = document.getElementById("question-container");
const start = document.getElementById("Start");
const para = document.getElementById("Para");

let current_question = 0;

function showQuestion() {
    container.classList.add("question");
    const q = questions[current_question];
    container.innerHTML = `<h2>${q.question}</h2>`;
    q.options.forEach(function(option){
        const but = document.createElement("button");
        but.classList.add("Options")
        but.textContent = option;
        but.addEventListener("click", function(){
            answers[current_question + 1] = option;
            if (current_question === 4) {
                container.style.display = 'none';
                para.style.display = 'none';
                startAnalysis();
            } else {
                current_question++;
                showQuestion();
            };
        });
        container.appendChild(but);
    });
};

start.addEventListener("click", function(){
    para.innerHTML = `<p>Great. Let's start by asking you some questions.</p>`;
    start.style.display = "none";
    container.style.display = "block";
    showQuestion();
});

function startAnalysis() {
    const analysis = document.getElementById("analysis");
    const analysisText = document.getElementById("analysisText");
    analysis.style.display = "block";
    let i = 0;
    function nextMessage() {
        analysisText.innerHTML = analysisMessage[i][0];
        const delay = analysisMessage[i][1];
        i++;
        if (i < analysisMessage.length) {
            setTimeout(nextMessage, delay);
        } else {
            setTimeout(showResult, delay);
        };
    };
    nextMessage();
};

function showResult() {
    const analysis = document.getElementById("analysis");
    const result = document.getElementById("result");

    result.innerHTML = "";

    analysis.style.display = "none";
    result.style.display = "flex";
    result.style.flexDirection = "column";
    result.style.alignItems = "center";
    result.style.justifyContent = "center";

    const resultText = document.createElement("p");
    resultText.innerHTML = getResult();
    result.appendChild(resultText);

    const button1 = document.createElement('button');
    button1.innerHTML = "Once Again?";
    button1.id = "End";
    button1.addEventListener("click", function(){
        restartQuiz();
    });
    result.appendChild(button1);

    const button2 = document.createElement('button');
    button2.innerHTML = "Surprise?";
    button2.id = "Surprise";
    button2.addEventListener("click", function(){
        Surprise();
    });
    result.appendChild(button2);
};

function restartQuiz() {
    current_question = 0;
    for (let key in answers) {
        delete answers[key];
    };
    document.getElementById("result").style.display = 'none';
    document.getElementById("question-container").style.display = 'block';
    showQuestion();
};

function Surprise() {
    const Surprise = document.getElementById("ask");
    const SurpriseText = document.getElementById("askText");

    result.style.display = "none";
    Surprise.style.display = "flex";
    Surprise.style.flexDirection = "column";
    Surprise.style.alignItems = "center";
    Surprise.style.justifyContent = "center";

    SurpriseText.innerHTML = "I thought that a date might be a bit too much for you.<br>" + "So Let's take it slow.<br>" + "For Starters...<br>" + "Wait for it..."
    setTimeout(function(){
        Surprise.style.display = 'none';
        const garbaPage = document.getElementById("garbaPage");
        const giftBox = document.getElementById("giftBox");
        const lid = document.querySelector(".boxLid");

        garbaPage.style.display = 'block';

        const bow = document.createElement("div");
        bow.classList.add("bow");
        lid.appendChild(bow);

        const knot = document.createElement("div");
        knot.classList.add("knot");
        bow.appendChild(knot);

        const leftTail = document.createElement("div");
        leftTail.classList.add("tail", "left");
        bow.appendChild(leftTail);

        const rightTail = document.createElement("div");
        rightTail.classList.add("tail", "right");
        bow.appendChild(rightTail);

        const noButton = document.getElementById("No");
        const noPopup = document.getElementById("noPopup");
        const reconsiderButton = document.getElementById("Reconsider");

        noButton.addEventListener("click", function(){
            noPopup.style.display = "flex";
        });

        reconsiderButton.addEventListener("click", function(){
            noPopup.style.display = "none";
        });

        const yesButton = document.getElementById("Yes");

        yesButton.addEventListener("click", function(){
            document.getElementById("garbaPage").innerHTML = `
            <div class="finalMessage">
                <h1>YAYYYYYY ❤️</h1>
                <p>Please text me because I still haven't learnt how to get your responses to me 😭</p>
                <p>And I also don't know how to make an exit button so just close your browser 😭</p> 
            </div>
            `;
        });

        setTimeout(function(){
            giftBox.classList.add("open");
        }, 500);
        setTimeout(function(){
            garbaPage.classList.add("showText");
        }, 1600);
    }, 6000);
};

function getResult() {
    if (answers[1] === "Momos" && answers[2] === "Someone should probably stop me" && answers[3] === "Don't ask" && answers[4] === "Obviously yes" && answers[5] === "Momos") {
        return "ENGINE OVERLOAD.<br><br>Subject is dangerously compatible with momos.<br>Two experts resigned. One ordered momos.";
    }
    else if (answers[1] === "Momos" && answers[2] === "Someone should probably stop me" && answers[3] === "Good" && answers[4] === "Obviously yes" && answers[5] === "Momos") {
        return "FINAL DIAGNOSIS<br><br>Severe Momo dependency.<br>Elevated chaos level.<br>Questionable decision-making.<br>Surprisingly good mood.<br><br>TREATMENT: One plate of Momos immediately."
    }
    else if (answers[2] === "Someone should probably stop me" && answers[3] === "Don't ask" && answers[4] === "Most probably no") {
        return "Three highly qualified experts reviewed your responses.<br>All three recommended supervision."
    }
    else if (answers[4] === "Obviously yes" && answers[5] === "Stay in room") {
        return "You want to stay in your room but also said yes to momos.<br>The engine has identifieda contradiction.<br>SOLUTION:Leave room 🠮 momos 🠮 return"
    }
    else if (answers[2] === "Someone should probably stop me" && answers[3] === "Don't ask" && answers[4] === "Obviously yes" && answers[5] === "Stay in room") {
        return "We have completed the analysis.<br>We don't understand the results.<br>We don't understand you.<br>But somehow, we think you should leave your room."
    }
    else{
        return "After analysing your responses, consulting three experts, restarting the engine twice and questioning several life choices...<br><br>The machine has reached a conclusion.<br>You should go out and have some momos."
    };
};
