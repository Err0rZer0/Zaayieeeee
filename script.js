const body = document.body;
let sadness = 0;
let noClicks = 0;
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

// DESKTOP: hover
noBtn.addEventListener("mouseover", () => {
	if (!isMobile && noClicks < maxNoClicks) moveNoButton();
});

// MOBILE: tap
noBtn.addEventListener("touchstart", (e) => {
	e.preventDefault();
	if (noClicks < maxNoClicks) moveNoButton();
});

// NO click
noBtn.addEventListener("click", () => {
	noClicks++;
	sadness++;

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

		switch (noClicks) {
		case 1:
			msg.textContent = "Ay… ngieee si baby nmaannn bakit no 🥺💔";
			yesBtn.style.transform = "translateX(-50%) scale(1.2)";
			changeGif("12782870542608816906"); // sad teddy GIF
			break;
		case 2:
			msg.textContent = "Seriously babyyy? 😢";
			changeGif("9743203998655728266"); // broken hearted bear gif
			break;
		case 3:
			msg.textContent = "Sgeee bahala ka dyaaaannn hmmpp :(((";
			changeGif("20040131"); // Sad bear
			break;
		case 4:
			msg.textContent = "What a cruel worlddd… 🥺";
			changeGif("20083344"); // Sad bear bed
			break;
		case 5:
			noBtn.style.display = "none"; // NO disappears
			changeGif("16466364824287508559");
			msg.textContent = "You have no choice, u said yes to me long ago  eh hehehe >:)";
			break;
		default:
			noBtn.style.display = "none";
			break;
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
