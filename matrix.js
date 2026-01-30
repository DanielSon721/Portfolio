// matrix.js
const canvas = document.getElementById("canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡ
  let letters = "abcdefghijklmnopqrstuvwxyzㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡαβγδεζηθικλμνξοπρσςτυφχψω".split("");
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

  setInterval(draw, 50);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = new Array(Math.floor(columns)).fill(1);
  });
}

// Email copy function
function copyEmail(event) {
  if (event) event.preventDefault();
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
  msgDiv.style.background = "#32435aff";
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

// Scroll header behavior
document.addEventListener("DOMContentLoaded", () => {
  const scrollHeader = document.getElementById("scroll-header");
  if (scrollHeader) {
    const SCROLL_SHOW_Y = 60;   // show earlier on scroll
    const HOVER_ZONE_Y = 48;    // px from top that triggers reveal
    let hoverHideTimeout;
    let isPointerInHeader = false;

    const showHeader = () => {
      clearTimeout(hoverHideTimeout);
      scrollHeader.classList.add("visible");
    };

    const hideHeader = () => {
      scrollHeader.classList.remove("visible");
    };

    const updateForScroll = () => {
      if (window.scrollY > SCROLL_SHOW_Y) {
        showHeader();
      } else if (!isPointerInHeader) {
        hideHeader();
      }
    };

    const handleMouseMove = (e) => {
      const rect = scrollHeader.getBoundingClientRect();
      const inHeaderBounds = e.clientY >= rect.top && e.clientY <= rect.bottom;
      const nearTop = e.clientY <= HOVER_ZONE_Y;
      isPointerInHeader = inHeaderBounds;

      if (nearTop || inHeaderBounds) {
        showHeader();
      } else if (window.scrollY <= SCROLL_SHOW_Y) {
        clearTimeout(hoverHideTimeout);
        hoverHideTimeout = setTimeout(() => {
          if (window.scrollY <= SCROLL_SHOW_Y && !isPointerInHeader) {
            hideHeader();
          }
        }, 0);
      }
    };

    // Initial state
    updateForScroll();

    window.addEventListener("scroll", updateForScroll);
    document.addEventListener("mousemove", handleMouseMove);
  }

  // PDF viewer handling for writing.html
  const urlParams = new URLSearchParams(window.location.search);
  const sample = urlParams.get('sample');
  
  if (sample && sample !== 'Why-I-Love-Cybersecurity') {
    const samplesGrid = document.getElementById('samples-grid');
    const pdfViewerSection = document.getElementById('pdf-viewer-section');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    if (samplesGrid && pdfViewerSection && pdfViewer) {
      samplesGrid.classList.add('hidden');
      pdfViewerSection.classList.remove('hidden');
      pdfViewer.src = `writing/${sample}.pdf`;
      document.title = `Daniel Son - ${getSampleTitle(sample)}`;
    }
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

// Course filtering functionality
function filterCourses(category) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`${category}-btn`).classList.add('active');
  
  // Show/hide courses based on category
  const allCourses = document.querySelectorAll('.course-tile');
  
  allCourses.forEach(course => {
    if (category === 'cs' && course.classList.contains('cs-course')) {
      course.style.display = 'block';
    } else if (category === 'math' && course.classList.contains('math-course')) {
      course.style.display = 'block';
    } else {
      course.style.display = 'none';
    }
  });
}

// Initialize with cs courses showing
document.addEventListener('DOMContentLoaded', function() {
  filterCourses('cs');
});

/************************************
 *  LEETCODE ANALYTICS FETCH LOGIC  *
 ************************************/

const leetUsername = "DanielSon721";

async function loadLeetCodeStats() {
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetUsername}`);
    const data = await res.json();

    if (!data || !data.totalSolved) return;

    // Main stat
    document.getElementById("lc-total-solved").innerText = data.totalSolved;

    // Labels
    document.getElementById("lc-easy-label").innerText =
      `${data.easySolved} / ${data.totalEasy}`;

    document.getElementById("lc-medium-label").innerText =
      `${data.mediumSolved} / ${data.totalMedium}`;

    document.getElementById("lc-hard-label").innerText =
      `${data.hardSolved} / ${data.totalHard}`;

    // Bars
    document.getElementById("lc-easy-bar").style.width =
      `${(data.easySolved / data.totalEasy) * 100}%`;

    document.getElementById("lc-medium-bar").style.width =
      `${(data.mediumSolved / data.totalMedium) * 100}%`;

    document.getElementById("lc-hard-bar").style.width =
      `${(data.hardSolved / data.totalHard) * 100}%`;

  } catch (err) {
    console.log("LeetCode API error", err);
  }
}

document.addEventListener("DOMContentLoaded", loadLeetCodeStats);
