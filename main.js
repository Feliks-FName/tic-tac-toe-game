const windowGame = document.getElementById('box-window_game'); //обертка игрового поля
let boxes = document.getElementsByClassName('box'); // элементы игрового поля, на которые вешается нужный класс
let owerley = document.querySelector('.owerley'); // оверлей, по клику которого закрывается модалка и очищается поле

const btn = document.getElementById('btn-js'); // кнопка, по клику которой закрывается модалка и очищается поле
let strResult = document.querySelector('.result-game'); //Строка, которая, в зависимости от результата, подсталяется в модалку
let modal = document.querySelector('.modal'); // Модальное окно

let reloadSvg = document.querySelector('.reload-svg'); //Иконка перезагрузки игрового поля
let soundSvg = document.querySelector('.sound-svg'); // Иконка со звуком
let innerSvg = document.querySelector('.svg-item'); // Обертка для svg

let move = 0; // Ходы
let result = ''; //Динамическая строка с результатом
// Чей ход

let whoMove = document.getElementById('who');
/* (function writeWhoMove() {
	if (move % 2 == 0) {
		return whoMove.innerHTML = 'Ход Х';
	} else if (move % 2 != 0) {
		return whoMove.innerHTML = 'Ход 0';

	} else if (modal.classList.contains('active')) {
		return whoMove.innerHTML = 'Ход Х';
	}
})(); */
// whoMove.innerHTML = writeWhoMove();
console.log(whoMove);


// Кол-во побед
let winX = 1;
let winO = 1;

let scoreX = document.querySelector('.score-x');
let scoreO = document.querySelector('.score-o');


// Игровое окно
windowGame.addEventListener('click', function (e) {
	if (e.target.className == 'box') {
		move % 2 === 0 ? e.target.classList.add('activeX') : e.target.classList.add('activeO');
		move++;
		check();


	};
});

function check() {
	// writeWhoMove();

	const arr = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		[0, 4, 8],
		[6, 4, 2],
	];

	for (let i = 0; i < arr.length; i++) {

		if (boxes[arr[i][0]].classList.contains('activeX') &&
			boxes[arr[i][1]].classList.contains('activeX') &&
			boxes[arr[i][2]].classList.contains('activeX')) {

			result = 'Победили крестики!';
			addClassLineBox(arr, i);
			setTimeout(prepaireResult, 400, result);
			scoreWin(scoreX, winX++, 'крестиков');
			break;

		} else if (boxes[arr[i][0]].classList.contains('activeO') &&
			boxes[arr[i][1]].classList.contains('activeO') &&
			boxes[arr[i][2]].classList.contains('activeO')) {

			result = 'Победили нолики!';
			addClassLineBox(arr, i);
			setTimeout(prepaireResult, 400, result);
			scoreWin(scoreO, winO++, 'ноликов');

			break;

		} else if (move == 9 && (modal.classList.contains('active') == false)) {

			result = 'Ничья!'
			prepaireResult(result);
			break;

		}

	};
}

function prepaireResult(str) {
	modal.classList.add('active');
	strResult.innerHTML = ` ${str}`;
	move = 0;


	btn.addEventListener('click', function (e) {
		e.preventDefault();
		modal.classList.remove('active');

		clearField()
		// window.location.reload();
	});

	owerley.addEventListener('click', function (e) {
		e.preventDefault();
		modal.classList.remove('active');
		clearField()
	});
}


// Клик по иконке сброса игрового поля
reloadSvg.addEventListener('click', function (e) {
	e.preventDefault();
	reloadGame();
})

// очищаем игровое поле
function clearField() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].classList.remove(boxes[i].classList.item(1));
	};
}


// сброс текущей игры
function reloadGame() {
	reloadSvg.classList.add('active');
	clearField()
	move = 0;

	setTimeout(function () {
		reloadSvg.classList.remove('active');
	}, 500)
};


/* function firstWhoMove() {
	whoMove.innerHTML = 'Ход Х'
} */

//Черта победы
function addClassLineBox(arr, i) {
	boxes[arr[i][0]].classList.add('line');
	boxes[arr[i][1]].classList.add('line');
	boxes[arr[i][2]].classList.add('line');
}

//Очки побед
function scoreWin(winner, num, name) {
	winner.innerHTML = `Побед ${name}: ${num}`;
}

// Звуки клика по игровому полю
function soundClick() {
	let audio = new Audio(); // Создаём новый элемент Audio
	audio.src = './click.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем
}

//событие клика по иконке звука
soundSvg.addEventListener('click', function (e) {
	e.preventDefault();
	innerSvg.classList.toggle('no-sound');
	getElem(boxes, delAttrBox); //Добавить/убрать звук

})

// Добавить/убрать звук
function delAttrBox(elem) {
	if (innerSvg.classList.contains('no-sound')) {
		elem.setAttribute('onclick', '');
	} else {
		elem.setAttribute('onclick', 'soundClick()');
	}
}
//Перебор box и вкл/выкл звука
/* function delAttrBox() {
	for (const elem of boxes) {
		if (innerSvg.classList.contains('no-sound')) {
			elem.setAttribute('onclick', '');
		} else {
			elem.setAttribute('onclick', 'soundClick()');
		}

	}
} */

// Функция-коллбек для взаимодействия с элементами игрового поля
function getElem(arr, callback) {
	for (const elem of boxes) {
		callback(elem);
	}
}

