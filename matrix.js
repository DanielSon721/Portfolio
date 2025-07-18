const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let letters =
  "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ".split(
    ""
  );
  //ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789αβθλμΞΣφψΩ

let fontSize = 14;
let columns = canvas.width / fontSize;
let drops = new Array(Math.floor(columns)).fill(1);

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

function copyEmail(event) {
  event.preventDefault();
  const email = "djson721@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showCopiedMessage("Copied to clipboard!");
  });
}

function showCopiedMessage(message) {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = message;
  msgDiv.style.position = "fixed";
  msgDiv.style.top = "50%";
  msgDiv.style.left = "50%";
  msgDiv.style.transform = "translate(-50%, -50%)";
  msgDiv.style.background = "#32435aff"; // Tailwind gray-800
  msgDiv.style.color = "white";
  msgDiv.style.padding = "12px 24px";
  msgDiv.style.borderRadius = "10px";
  msgDiv.style.zIndex = 9999;
  msgDiv.style.opacity = "0";
  msgDiv.style.transition = "opacity 0.3s ease";

  document.body.appendChild(msgDiv);
  requestAnimationFrame(() => {
    msgDiv.style.opacity = "1";
  });

  setTimeout(() => {
    msgDiv.style.opacity = "0";
    setTimeout(() => document.body.removeChild(msgDiv), 300);
  }, 2000);
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = canvas.width / fontSize;
  drops = new Array(Math.floor(columns)).fill(1);
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollHeader = document.getElementById("scroll-header");

  // Show header if already scrolled down on load
  if (window.scrollY > 100) {
    scrollHeader.classList.add("visible");
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollHeader.classList.add("visible");
    } else {
      scrollHeader.classList.remove("visible");
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const sample = urlParams.get('sample');
  
  // Don't try to show PDF viewer for the GitHub-linked sample
  if (sample && sample !== 'Why-I-Love-Cybersecurity') {
    // Show the PDF viewer and hide the grid
    document.getElementById('samples-grid').classList.add('hidden');
    document.getElementById('pdf-viewer-section').classList.remove('hidden');
    
    // Set the PDF source
    document.getElementById('pdf-viewer').src = `writing/${sample}.pdf`;
    
    // Update the page title
    document.title = `Daniel Son - ${getSampleTitle(sample)}`;
  }
});

function getSampleTitle(sample) {
  const titles = {
    'machines': 'Machines Do Think... Kind Of',
    'platovsmlk': 'Plato vs. Martin Luther King Jr.',
    'cherryhill': 'Cherry Hill Urban Community Garden',
    'gymculture': 'Damaging Consequences of Toxic Gym Culture',
    'commonapp': 'Common App Essay',
    'america': 'America: The Nation Builder'
  };
  return titles[sample] || 'Writing Sample';
}