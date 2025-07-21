// matrix.js

const canvas = document.getElementById("canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let letters = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ".split("");
  let fontSize = 14;
  let columns = canvas.width / fontSize;
  let drops = new Array(Math.floor(columns)).fill(1);
  let resizeTimeout; // For debouncing resize events

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // Original setInterval (unchanged)
  setInterval(draw, 50);

  // Debounced resize handler (Solution 3)
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout); // Clear any pending resize
    resizeTimeout = setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = canvas.width / fontSize;
      drops = new Array(Math.floor(columns)).fill(1);
    }, 100); // Only executes after 100ms of no resize events
  });
}