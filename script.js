let currentScreen = 0; // 0 = title, 1 = intro, 2 = more text, 3 = candels

let i = 0;
let currentstring = 0;
document.addEventListener("keydown", function(event) {
    // Handle screens with Enter key
    if (event.key === "Enter") {
        nextTutorialStep();
    }
});

function nextTutorialStep() {
    if (currentScreen === 0) {
        // Move from title to intro
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("intro-screen").style.display = "block";
        currentScreen = 1;
    } else if (currentScreen === 1) {
        // Move from intro to more text
        document.getElementById("intro-screen").style.display = "none";
        document.getElementById("more-text-screen").style.display = "block";
        currentScreen = 2;
    } else if (currentScreen === 2) {
        // Move from more text to more text screen 2
        document.getElementById("more-text-screen").style.display = "none";
        document.getElementById("candels").style.display = "block";
        currentScreen = 3;
    }
};
