// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Select the display input and pop-out div
    const display = document.getElementById('display');
    const popOut = document.getElementById('popOut');

    // List of riddles with answers
    const riddles = [
        { question: "What has keys but can't open locks?", answer: "keyboard" },
        { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
        { question: "I'm tall when I'm young, and I'm short when I'm old. What am I?", answer: "candle" },
        { question: "What can travel around the world while staying in a corner?", answer: "stamp" },
        { question: "What has a head, a tail, but no body?", answer: "coin" }
    ];

    // Append value to the display, but only if the question/riddle is answered correctly
    function appendValue(value) {
        // Check if the value is a number
        if (!isNaN(value)) {
            // Randomly decide between math question or riddle
            const isMathQuestion = Math.random() < 0.5;
            if (isMathQuestion) {
                showMathQuestionPopup(value);
            } else {
                showRiddlePopup(value);
            }
        } else {
            // If it's not a number, directly append it
            display.value += value;
            showPopOut(value); // Show the pop-out with the pressed value
        }
    }

    // Show the pop-out for the pressed value
    function showPopOut(value) {
        popOut.textContent = value;
        popOut.classList.remove('hidden');
        popOut.classList.add('show');

        // Hide pop-out after 1.5 seconds
        setTimeout(() => {
            popOut.classList.remove('show');
            popOut.classList.add('hidden');
        }, 1500);
    }

    // Show a pop-up with an arithmetic question
    function showMathQuestionPopup(value) {
        // Generate a simple random arithmetic question
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const correctAnswer = num1 + num2;

        // Create a pop-up container
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `<p>Solve this to continue: What is ${num1} + ${num2}?</p>`;

        // Input field for the answer
        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.placeholder = 'Enter your answer';

        // Button to submit the answer
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', () => {
            // Check if the answer is correct
            if (parseInt(inputField.value) === correctAnswer) {
                display.value += value; // Append the value if the answer is correct
                popup.remove(); // Remove the pop-up
                showPopOut(value); // Show the value in the pop-out
            } else {
                alert("Incorrect answer, try again."); // Show alert if answer is wrong
                inputField.value = ''; // Clear input for retry
            }
        });

        // Append elements to the pop-up and display it
        popup.appendChild(inputField);
        popup.appendChild(submitButton);
        document.body.appendChild(popup);
    }

    // Show a pop-up with a random riddle
    function showRiddlePopup(value) {
        // Select a random riddle
        const riddle = riddles[Math.floor(Math.random() * riddles.length)];

        // Create a pop-up container
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `<p>Solve this to continue: ${riddle.question}</p>`;

        // Input field for the answer
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Enter your answer';

        // Button to submit the answer
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', () => {
            // Check if the answer is correct (case-insensitive)
            if (inputField.value.toLowerCase() === riddle.answer.toLowerCase()) {
                display.value += value; // Append the value if the answer is correct
                popup.remove(); // Remove the pop-up
                showPopOut(value); // Show the value in the pop-out
            } else {
                alert("Incorrect answer, try again."); // Show alert if answer is wrong
                inputField.value = ''; // Clear input for retry
            }
        });

        // Append elements to the pop-up and display it
        popup.appendChild(inputField);
        popup.appendChild(submitButton);
        document.body.appendChild(popup);
    }

    // Clear the display
    function clearDisplay() {
        display.value = '';
    }

    // Calculate the result
    function calculate() {
        try {
            display.value = eval(display.value); // Evaluate the expression in the display
            display.classList.add('glow');
        
            // Remove the glow effect after animation completes
            setTimeout(() => {
                display.classList.remove('glow');
            }, 3000);
        } catch (e) {
            display.value = 'Error'; // Show error if invalid input
        }
    }

    // Function to show confetti animation
    function showConfetti() {
        if (typeof confetti === "function") { // Check if confetti library is loaded
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        } else {
            console.error("Confetti library not loaded. Please ensure it is included.");
        }
    }

    // Expose functions to be used in HTML buttons
    window.appendValue = appendValue;
    window.clearDisplay = clearDisplay;
    window.calculate = calculate;
});











