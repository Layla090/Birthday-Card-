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
    .then((stream) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      source.connect(analyser);

      analyser.fftSize = 64; // power of 2 (idk why)
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function analyze() {
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }

        const average = sum / dataArray.length;
        console.log("Mic level:", average);

        if (average > 5) { //10-30
          document.getElementById("candels").style.display = "none";
          document.getElementById("blow").style.display = "block";
          return; // stop checking once triggered
        }

        requestAnimationFrame(analyze);
      }

      analyze(); //start loop
    })
    .catch((err) => {
      console.error("Error accessing microphone:", err);
    });
}
