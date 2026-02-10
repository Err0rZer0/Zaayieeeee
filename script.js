const body = document.body;
let noStage = 1; // current "No section"
let noClicks = 0;
const maxNoClicks = 5;
let sadness = 0;
const maxNoClicks = 5; // NO can teleport/click up to 4 times

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const msg = document.getElementById("msg");
const questionBox = document.getElementById("questionBox");
const yesBox = document.getElementById("yesBox");
const btnArea = document.getElementById("btnArea");

// MOBILE DETECTION
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// MOVE NO INSIDE BUTTON AREA
function moveNoButton() {
	const areaRect = btnArea.getBoundingClientRect();
	const btnRect = noBtn.getBoundingClientRect();
	const maxX = areaRect.width - btnRect.width;
	const maxY = areaRect.height - btnRect.height;

	const x = Math.random() * maxX;
	const y = Math.random() * maxY;

	noBtn.style.left = x + "px";
	noBtn.style.top = y + "px";
}



// NO click
noBtn.addEventListener("click", () => {
	sadness++;
	noClicks++;

	// Hide hint
	const hint = document.getElementById("hintQuote");
	if (hint) hint.style.display = "none";

	// Darken background & hearts
	document.body.classList.add("rain");
	body.style.background =
		`linear-gradient(135deg,
		rgb(${255 - sadness*30}, ${214 - sadness*20}, ${224 - sadness*20}),
		rgb(${255 - sadness*40}, ${238 - sadness*30}, ${243 - sadness*30}))`;
	document.querySelector(".hearts").style.filter =
		`grayscale(${sadness * 40}%) blur(${sadness}px)`;

	// Teleport NO button
	if (noClicks <= 5) moveNoButton();

	// Handle case messages
	switch (true) {
		case noClicks <= 5 && noClicks > 0:
			if (noClicks === 1) msg.textContent = "Ay… ngieee si baby nmaannn bakit no 🥺💔";
			if (noClicks === 2) msg.textContent = "Seriously babyyy? 😢";
			if (noClicks === 3) msg.textContent = "Sgeee bahala ka dyaaaannn hmmpp :(((";
			if (noClicks === 4) msg.textContent = "What a cruel worlddd… 🥺";
			if (noClicks === 5) {
				msg.textContent = "You are really stubborn… 😏";
				changeGif("16466364824287508559"); // change GIF
				currentCase++; // move to next stage
				noClicks = 0;   // reset clicks for next case
			}
			break;

		case currentCase === 2 && noClicks <= 5:
			// same logic for case 2
			if (noClicks === 1) msg.textContent = "Still no? Really? 🥴";
			if (noClicks === 2) msg.textContent = "You really like saying no huh 😤";
			if (noClicks === 5) {
				msg.textContent = "Haha, you can’t resist! 💖";
				noBtn.style.display = "none"; // final hide
			}
			break;

		// Add more cases similarly if you want
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

