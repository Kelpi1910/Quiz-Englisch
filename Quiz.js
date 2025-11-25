// --- 1. QUIZ DATEN ---
// Die Fragen, Antwortmöglichkeiten und die korrekte Antwort
const quizData = [
    {
        question: "Do you think the USA is the best country?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "Do you measure recipes in cups?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "Do you have ranch-sauce in your fridge?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "Do you measure in inches or centimeters?",
        a: "inches",
        b: "centimeters",
        correct: "a",
    },
    {
        question: "Do you have a gun at home?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "Did you vote for Donald Trump?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "Is Portugal next to France?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "Is somebody of your family fat?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "Do you think chocolate milk comes form brown cows?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "Have you ever been abroad?",
        a: "Yes",
        b: "No",
        correct: "b",
    },
];

// --- 2. ZUSTANDSVARIABLEN ---
let currentQuiz = 0; // Index der aktuellen Frage
let score = 0;       // Zähler für die korrekten Antworten
let selectedAnswer = null; // Speichert die aktuell gewählte Antwort ('a', 'b', 'c', 'd')

// --- 3. DOM-ELEMENTE ABFRAGEN ---
// Stelle sicher, dass diese IDs mit denen in der index.html übereinstimmen
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerList = document.getElementById('answer-list');
const submitBtn = document.getElementById('submit');
const messageEl = document.getElementById('message');

// Array zur Speicherung der Antwort-Elemente für einfache Manipulation
const answerLabels = []; 

// --- 4. FUNKTIONEN ---

/**
 * Erstellt die Antwort-Labels dynamisch basierend auf der QuizData.
 * Dies muss nur einmal beim Start aufgerufen werden.
 */
function createAnswerElements() {
    // Definiere die möglichen IDs/Werte für die Radio-Buttons
    const answerKeys = ['a', 'b'];

    answerKeys.forEach(key => {
        const li = document.createElement('li');
        
        // Erstelle das Radio-Button-Input-Element
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.id = `answer-${key}`;
        input.value = key;

        // Erstelle das Label, das als klickbarer Button dient
        const label = document.createElement('label');
        label.htmlFor = `answer-${key}`;
        // Verwende die gleichen Klassen wie in der ursprünglichen Datei
        label.className = 'answer-label block p-4 border border-gray-300 rounded-lg flex items-center shadow-sm';
        
        // Text-Container für die Antwort
        const spanText = document.createElement('span');
        spanText.id = `text-${key}`;
        spanText.className = 'answer-text ml-3 flex-grow text-lg text-gray-700';
        
        // Füge den Radio-Button und den Text-Container dem Label hinzu
        label.appendChild(input);
        label.appendChild(spanText);
        
        // Füge das Label dem Listen-Element hinzu
        li.appendChild(label);
        answerList.appendChild(li);

        // Speichere die Elemente für den späteren Zugriff
        answerLabels.push({ input, spanText, label });

        // Füge den Klick-Listener zum Label hinzu
        label.addEventListener('click', () => {
            // Setze die ausgewählte Antwort, sobald das Label geklickt wird
            setTimeout(() => {
                selectedAnswer = key;
                submitBtn.disabled = false; // Aktiviere den Absenden-Button
                messageEl.classList.add('hidden'); // Verstecke die Fehlermeldung
            }, 50); 
        });
    });
}

/**
 * Lädt die nächste Frage und die zugehörigen Antwortmöglichkeiten in die DOM-Elemente.
 */
function loadQuiz() {
    // Setze die Auswahl zurück
    selectedAnswer = null;
    submitBtn.disabled = true;

    // Entferne alle Check-Markierungen
    answerLabels.forEach(item => {
        item.input.checked = false;
        // Entferne eventuelle Markierungen der vorherigen Frage (z.B. grün/rot)
        item.label.classList.remove('bg-green-100', 'border-green-600', 'bg-red-100', 'border-red-600');
    });

    // Lade die Daten für die aktuelle Frage
    const currentQuizData = quizData[currentQuiz];

    // Setze den Fragetext
    questionEl.innerText = `${currentQuiz + 1}. ${currentQuizData.question}`;

    // Setze die Antworttexte
    answerLabels.forEach(item => {
        const key = item.input.value;
        // Füge das Buchstaben-Präfix hinzu (z.B. A:, B:, C:)
        item.spanText.innerText = `${key.toUpperCase()}: ${currentQuizData[key]}`;
    });
}

/**
 * Zeigt das Endergebnis des Quiz an.
 */
function showResults() {
    quiz.innerHTML = `
        <div class="text-center p-8">
            <h2 class="text-3xl font-bold text-indigo-700 mb-4">Quiz finished!</h2>
            <p class="text-xl text-gray-800 mb-8">
                You have answered ${score} out of ${quizData.length} questions like a true American.
            </p>
            <p class="text-gray-600 mb-6">
                ${score === quizData.length ? 'Well Done! You are really a ture American! ' : (score >= quizData.length / 2 ? 'Good Job! You are close to be a true American.' : 'Better luck next time! Maybe you are a native in another language.')}
            </p>
            <button onclick="location.reload()" 
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-150 shadow-md">
                Retry
            </button>
        </div>
    `;
}

/**
 * Behandelt den Klick auf den Absenden-Button.
 */
submitBtn.addEventListener('click', () => {
    if (!selectedAnswer) {
        messageEl.innerText = "Choose an answer before locking in.";
        messageEl.classList.remove('hidden');
        return;
    }

    // Prüfen, ob die Antwort korrekt ist
    if (selectedAnswer === quizData[currentQuiz].correct) {
        score++;
    }

    // Zur nächsten Frage springen
    currentQuiz++;

    // Prüfen, ob noch Fragen übrig sind
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        // Wenn alle Fragen beantwortet sind
        showResults();
    }
});

// --- 5. INITIALISIERUNG ---
// Erstelle die Antwort-Elemente beim Start, bevor die erste Frage geladen wird
createAnswerElements();

// Lade die erste Frage
loadQuiz();