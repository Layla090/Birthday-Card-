document.getElementById("candels").classList.add("show");
document.getElementById("candels").classList.remove("show");
let currentScreen = 0; // 0 = title, 1 = intro, 2 = more text, 3 = candels
let micStarted = false;

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") nextTutorialStep();
});

function nextTutorialStep() {
  if (currentScreen === 0) {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("intro-screen").style.display = "block";
    currentScreen = 1;

  } else if (currentScreen === 1) {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("more-text-screen").style.display = "block";
    currentScreen = 2;

  } else if (currentScreen === 2) {
    document.getElementById("more-text-screen").style.display = "none";
    document.getElementById("candels").style.display = "block";
    currentScreen = 3;
    startMic();
  }
}

function startMic() {
  if (micStarted) return;
  micStarted = true;

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.fftSize = 512;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function analyze() {
        analyser.getByteFrequencyData(dataArray);
        let sum = dataArray.reduce((a, b) => a + b, 0);
        let average = sum / dataArray.length;

        if (average > 50) { // Adjust threshold as needed
          document.getElementById("candels").style.display = "none";
          document.getElementById("blow").style.display = "flex";
        }
      }

      analyze();
    })
    .catch(err => {
      console.error('Error accessing microphone:', err);
    });
}