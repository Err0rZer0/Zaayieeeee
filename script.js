const body = document.body;
let sadness = 0;
let noClicks = 0;
const maxNoClicks = 3; // NO can teleport/click up to 4 times

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const msg = document.getElementById("msg");
const questionBox = document.getElementById("questionBox");
const yesBox = document.getElementById("yesBox");
const btnArea = document.getElementById("btnArea");

// MOBILE DETECTION
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function moveNoButton() {
    const areaRect = btnArea.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Ensure it stays within the btn-area
    const maxX = areaRect.width - btnRect.width;
    const maxY = areaRect.height - btnRect.height;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// NO click
noBtn.addEventListener("click", () => {
    noClicks++;
    sadness++;

    // ALWAYS teleport on click (1 click = 1 teleport)
    moveNoButton();

    // Rain + background mood
    document.body.classList.add("rain");
    body.style.background = `linear-gradient(135deg, 
        rgb(${255 - sadness*25}, ${214 - sadness*15}, ${224 - sadness*15}), 
        rgb(${255 - sadness*35}, ${238 - sadness*25}, ${243 - sadness*25}))`;

    // NO progression (1 click = next case)
    if (noClicks === 1) {
        msg.textContent = "Ay… bakit noo? 🥺💔";
        changeGif("12782870542608816906");
    } 
    else if (noClicks === 2) {
        msg.textContent = "ihhhh Seriously babyyy? Hmmmmp 1 more 😤";
        changeGif("9743203998655728266");
    } 
    else if (noClicks === 3) {
        msg.textContent = "What a cruel world 🥺";
        changeGif("20040131");
    } 
    else {
        // FINAL NO
        noBtn.style.display = "none";
        msg.textContent = "Wala ka nang choice, you said yes to me long ago na eh 😈";
        changeGif("16466364824287508559");
        yesBtn.style.transform = "translateX(-50%) scale(1.5)";
    }
});

// CLICK YES
yesBtn.addEventListener("click", () => {
	questionBox.classList.add("hidden");
	yesBox.classList.remove("hidden");

	// Reset background & hearts
	body.classList.remove("rain");
	body.style.background = "linear-gradient(135deg, #ffd6e0, #ffeef3)";
	document.querySelector(".hearts").style.filter = "none";

	// Show Valentine background text
	const valBgText = document.getElementById("valentineBgText");
	valBgText.classList.add("show");
});

// GIF CHANGE FUNCTION
function changeGif(postId) {
	const gifContainer = document.getElementById("gifContainer");
	gifContainer.innerHTML = `
		<div class="tenor-gif-embed"
			data-postid="${postId}"
			data-share-method="host"
			data-aspect-ratio="1"
			data-width="100%">
		</div>
	`;

	const script = document.createElement("script");
	script.src = "https://tenor.com/embed.js";
	script.async = true;
	document.body.appendChild(script);
}

// MOBILE AUTO-SCROLL
document.addEventListener("DOMContentLoaded", () => {
	if (isMobile) {
		questionBox.scrollIntoView({ behavior: "smooth" });
	}
});

// HAMBURGER BUTTON
const hamburgerBtn = document.getElementById("hamburgerBtn");
if (hamburgerBtn) {
	hamburgerBtn.addEventListener("click", () => {
		questionBox.scrollIntoView({ behavior: "smooth" });
	});
}
