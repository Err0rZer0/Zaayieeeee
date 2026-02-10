const body = document.body;
let sadness = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const msg = document.getElementById("msg");

const questionBox = document.getElementById("questionBox");
const yesBox = document.getElementById("yesBox");
const btnArea = document.getElementById("btnArea");

let noClicks = 0;

/* MOVE NO INSIDE BUTTON AREA */
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

/* DESKTOP */
noBtn.addEventListener("mouseover", moveNoButton);

/* PHONE */
noBtn.addEventListener("touchstart", (e) => {
	e.preventDefault();
	moveNoButton();
});

/* CLICK NO */
noBtn.addEventListener("click", () => {
	noClicks++;
	sadness++;

	// HIDE HINT TEXT when NO is clicked
	const hint = document.getElementById("hintQuote");
	if (hint) hint.style.display = "none";

	// Darken mood
	document.body.classList.add("rain");

	body.style.background =
		`linear-gradient(135deg,
		rgb(${255 - sadness*30}, ${214 - sadness*20}, ${224 - sadness*20}),
		rgb(${255 - sadness*40}, ${238 - sadness*30}, ${243 - sadness*30}))`;

	// TURN HEARTS INTO RAIN
	document.querySelector(".hearts").style.filter =
		`grayscale(${sadness * 40}%) blur(${sadness}px)`;

	if (noClicks === 1) {
		msg.textContent = "Ay… ngieee si baby nmaannn bakit Nauuuurrrrrr :(( (last 1 hmmmmmp) 🥺💔";
		yesBtn.style.transform = "translateX(-50%) scale(1.4)";

		// SAD GIF
		changeGif("15195810");
	}

	if (noClicks === 2) {
		noBtn.style.display = "none";
		msg.textContent =
			"You have no choice, u said yes to me long ago eh hehehe >:)";
	}
});




function changeGif(postId) {
	gifContainer.innerHTML = `
		<div class="tenor-gif-embed"
			data-postid="${postId}"
			data-share-method="host"
			data-aspect-ratio="1"
			data-width="100%">
		</div>
	`;

	// Re-load Tenor script (IMPORTANT for mobile)
	const script = document.createElement("script");
	script.src = "https://tenor.com/embed.js";
	script.async = true;
	document.body.appendChild(script);
}



/* CLICK YES */
yesBtn.addEventListener("click", () => {
	questionBox.classList.add("hidden");
	yesBox.classList.remove("hidden");

	// RESET background & hearts
	body.classList.remove("rain");
	body.style.background = "linear-gradient(135deg, #ffd6e0, #ffeef3)";
	document.querySelector(".hearts").style.filter = "none";

	// SHOW VALENTINES BACKGROUND TEXT
	const valBgText = document.getElementById("valentineBgText");
	valBgText.classList.add("show");
});


