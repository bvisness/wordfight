const cells = document.querySelectorAll('.cell');
const button = document.querySelector('.button');
const timer = document.querySelector('.timer');

let gameActive = false;
let p1 = true;
let time = 0;

function dice() {
	return [
		['A', 'A', 'E', 'E', 'G', 'N'],
		['A', 'B', 'B', 'J', 'O', 'O'],
		['A', 'C', 'H', 'O', 'P', 'S'],
		['A', 'F', 'F', 'K', 'P', 'S'],
		['A', 'O', 'O', 'T', 'T', 'W'],
		['C', 'I', 'M', 'O', 'T', 'U'],
		['D', 'E', 'I', 'L', 'R', 'X'],
		['D', 'E', 'L', 'R', 'V', 'Y'],
		['D', 'I', 'S', 'T', 'T', 'Y'],
		['E', 'E', 'G', 'H', 'N', 'W'],
		['E', 'E', 'I', 'N', 'S', 'U'],
		['E', 'H', 'R', 'T', 'V', 'W'],
		['E', 'I', 'O', 'S', 'S', 'T'],
		['E', 'L', 'R', 'T', 'T', 'Y'],
		['H', 'I', 'M', 'N', 'U', 'Qu'],
		['H', 'L', 'N', 'N', 'R', 'Z'],
	];
}

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Qu', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const rots = ['r0', 'r90', 'r180', 'r270'];

function shuffle(a) {
	for (let i = a.length - 1; i >= 1; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}

	return a;
}

function randomElement(a) {
	return a[Math.floor(Math.random() * a.length)];
}

function rotateCell(cell) {
	rots.forEach(rot => {
		cell.classList.remove(rot);
	});
	cell.classList.add(randomElement(rots));
}

function initGame() {
	const shuffledDice = shuffle(dice());

	cells.forEach((cell, i) => {
		const die = shuffledDice[i];
		cell.innerHTML = randomElement(die);
		rotateCell(cell);
	});

	document.querySelector('.button-text').innerHTML = 'Next!';

	p1 = Math.random() > 0.5;
	gameActive = true;

	setInterval(() => {
		time += p1 ? 1 : -1;
		timer.innerHTML = time;
		timer.classList.toggle('p1', time > 0);
		timer.classList.toggle('p2', time < 0);
	}, 1000);

	nextTurn();
}

function nextTurn() {
	p1 = !p1;
	document.querySelector('.turn.p1').classList.toggle('show', p1);
	document.querySelector('.turn.p2').classList.toggle('show', !p1);
}

function randomLetter() {
	const cell = randomElement(cells);
	cell.innerHTML = randomElement(alphabet);
	rotateCell(cell);
}

button.addEventListener('click', () => {
	if (!gameActive) {
		initGame();
	} else {
		nextTurn();
		randomLetter();
	}
});
