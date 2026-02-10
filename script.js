const body = document.body;

let sadness = 0;
let noClicks = 0;
const maxNoClicks = 5;
let isTransitioning = false;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const msg = document.getElementById("msg");
const questionBox = document.getElementById("questionBox");
const yesBox = document.getElementById("yesBox");
const btnArea = document.getElementById("btnArea");
const gifContainer = document.getElementById("gifContainer");

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

document.addEventListener("DOMContentLoaded", () => {
	const hint = document.getElementById("hintQuote");

	if (hint && isMobile) {
		hint.style.display = "none";
	}
});

/* ---------------- MOVE NO BUTTON ---------------- */
function moveNoButton() {
	const areaRect = btnArea.getBoundingClientRect();
	const btnRect = noBtn.getBoundingClientRect();

	const maxX = areaRect.width - btnRect.width;
	const maxY = areaRect.height - btnRect.height;

	const x = Math.random() * maxX;
	const y = Math.random() * maxY;

	noBtn.style.left = `${x}px`;
	noBtn.style.top = `${y}px`;
}

/* ---------------- GIF CHANGE (SAFE) ---------------- */
function changeGif(postId) {
	gifContainer.innerHTML = `
		<div class="tenor-gif-embed"
			data-postid="${postId}"
			data-share-method="host"
			data-aspect-ratio="1"
			data-width="100%">
		</div>
	`;

	if (!window.tenorLoaded) {
		const script = document.createElement("script");
		script.src = "https://tenor.com/embed.js";
		script.async = true;
		document.body.appendChild(script);
		window.tenorLoaded = true;
	}
}

/* ---------------- NO INTERACTION (LIMITED) ---------------- */
function handleNoInteraction() {
	if (isTransitioning || noClicks >= maxNoClicks) return;

	isTransitioning = true;
	noClicks++;
	sadness++;

	// HIDE HINT (ONCE, SAFE)
	const hint = document.getElementById("hintQuote");
	if (hint) hint.style.display = "none";

	moveNoButton();

	// Background + hearts
	body.classList.add("rain");
	body.style.background = `
		linear-gradient(135deg,
		rgb(${255 - sadness * 30}, ${214 - sadness * 20}, ${224 - sadness * 20}),
		rgb(${255 - sadness * 40}, ${238 - sadness * 30}, ${243 - sadness * 30}))
	`;

	const hearts = document.querySelector(".hearts");
	if (hearts) {
		hearts.style.filter = `grayscale(${sadness * 40}%) blur(${sadness}px)`;
	}

	// STORY (EXACTLY 5 STATES)
	switch (noClicks) {
		case 1:
			msg.textContent = "Ay… ngieee si baby nmaannn bakit no 🥺💔";
			yesBtn.style.transform = "scale(1.2)";
			changeGif("12782870542608816906");
			break;

		case 2:
			msg.textContent = "Seriously babyyy? 😢";
			changeGif("9743203998655728266");
			break;

		case 3:
			msg.textContent = "Sgeee bahala ka dyaaaannn hmmpp :(((";
			changeGif("20040131");
			break;

		case 4:
			msg.textContent = "What a cruel worlddd… 🥺";
			changeGif("20083344");
			break;

		case 5:
			noBtn.style.display = "none";
			msg.textContent =
				"You have no choice, u said yes to me long ago eh hehehe >:)";
			changeGif("16466364824287508559");
			break;
	}

	setTimeout(() => {
		isTransitioning = false;
	}, 450);
}

/* ---------------- EVENTS ---------------- */

// Desktop: hover ONCE per state
if (!isMobile) {
	noBtn.addEventListener("mouseenter", handleNoInteraction);
}

// Mobile: tap
noBtn.addEventListener("click", (e) => {
	e.preventDefault();
	handleNoInteraction();
});

/* ---------------- YES CLICK ---------------- */
yesBtn.addEventListener("click", () => {
	questionBox.classList.add("hidden");
	yesBox.classList.remove("hidden");

	body.classList.remove("rain");
	body.style.background = "linear-gradient(135deg, #ffd6e0, #ffeef3)";

	const hearts = document.querySelector(".hearts");
	if (hearts) hearts.style.filter = "none";

	const valBgText = document.getElementById("valentineBgText");
	if (valBgText) valBgText.classList.add("show");
});

/* ---------------- MOBILE AUTO SCROLL ---------------- */
document.addEventListener("DOMContentLoaded", () => {
	const hint = document.getElementById("hintQuote");

	if (isMobile && hint) {
		hint.style.display = "none";
	}

	if (isMobile) {
		questionBox.scrollIntoView({ behavior: "smooth" });
	}
});


/* ---------------- HAMBURGER ---------------- */
const hamburgerBtn = document.getElementById("hamburgerBtn");
if (hamburgerBtn) {
	hamburgerBtn.addEventListener("click", () => {
		questionBox.scrollIntoView({ behavior: "smooth" });
	});
}


