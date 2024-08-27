let startBtn;
let pauseBtn;
let stopBtn;
let resetBtn;
let recordsBtn;
let stopwatch;
let time;
let timeList;
let infoBtn;
let modalShadow;
let closeModalBtn;
// ----------------
let countTime;
let minutes = 0;
let seconds = 0;
// ----------------
let timesArray = [];

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	startBtn = document.querySelector(".start");
	pauseBtn = document.querySelector(".pause");
	stopBtn = document.querySelector(".stop");
	resetBtn = document.querySelector(".reset");
	recordsBtn = document.querySelector(".records");
	stopwatch = document.querySelector(".stopwatch");
	time = document.querySelector(".time");
	timeList = document.querySelector(".time-list");
	infoBtn = document.querySelector(".info");
	modalShadow = document.querySelector(".modal-shadow");
	closeModalBtn = document.querySelector(".close");
};

const prepareDOMEvents = () => {
	startBtn.addEventListener("click", handleStart);
	pauseBtn.addEventListener("click", handlePause);
	stopBtn.addEventListener("click", handleStop);
	resetBtn.addEventListener("click", handleReset);
	recordsBtn.addEventListener("click", showRecords);
	infoBtn.addEventListener("click", showModal);
	closeModalBtn.addEventListener("click", showModal);
	window.addEventListener("click", (e) => {
		e.target === modalShadow ? showModal() : false;
	});
};

const handleStart = () => {
	clearInterval(countTime);
	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++;
			stopwatch.textContent = `${minutes}:0${seconds}`;
		} else if (seconds >= 9 && seconds < 59) {
			seconds++;
			stopwatch.textContent = `${minutes}:${seconds}`;
		} else if (seconds >= 59) {
			minutes++;
			seconds = 0;
			stopwatch.textContent = `${minutes}:00`;
		}
	}, 250);
};

const handlePause = () => {
	clearInterval(countTime);
};

const handleStop = () => {
	time.innerHTML = `Ostatni czas ${stopwatch.textContent}`;

	if (stopwatch.textContent !== "0:00") {
		time.style.visibility = "visible";
		timesArray.push(stopwatch.textContent);
		console.log(timesArray);
	}

	clearStuff();
};

const handleReset = () => {
	time.style.visibility = "hidden";
	timesArray = [];
	clearStuff();
};

const clearStuff = () => {
	clearInterval(countTime);
	stopwatch.textContent = "0:00";
	timeList.textContent = "";
	seconds = 0;
	minutes = 0;
};

const showRecords = () => {
	timeList.textContent = "";
	let num = 1;
	timesArray.forEach((time) => {
		const newTime = document.createElement("li");
		newTime.innerHTML = `Pomiar nr ${num}: <span> ${time} </span>`;
		timeList.append(newTime);
		num++;
	});
};

const showModal = () => {
	if (!(modalShadow.style.display === "block")) {
		modalShadow.style.display = "block";
	} else {
		modalShadow.style.display = "none";
	}
	modalShadow.classList.toggle("modal-animation");
};

document.addEventListener("DOMContentLoaded", main);
