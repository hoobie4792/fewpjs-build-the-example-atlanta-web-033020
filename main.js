// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', init);

function init() {
	initializeModal();
	initializeHeart();
}

function initializeModal() {
	const modal = document.querySelector('#modal');
}

function modalSuccess() {
	const modal = document.querySelector('#modal');
	modal.classList.add('hidden');
}

function modalFailure(err) {
	const modal = document.querySelector('#modal');
	modal.classList.remove('hidden');
	modal.innerText = err;
	setTimeout(() => modal.classList.remove('hidden'), 5000);
}

function initializeHeart() {
	hearts = document.querySelectorAll('.like');
	hearts.forEach((heart) => {
		heart.addEventListener('click', likePost);
	});
}

function likePost(e) {
	mimicServerCall()
		.then(() => renderLike(e.target))
		.catch(err => modalFailure(err));
}

function renderLike(heart) {
	modalSuccess();
	if (heart.classList.contains('activated-heart')) {
		heart.innerText = EMPTY_HEART;
		heart.classList.remove('activated-heart');
	} else {
		heart.innerText = FULL_HEART;
		heart.classList.add('activated-heart');
	}
}

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = 'http://mimicServer.example.com', config = {}) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			let isRandomFailure = Math.random() < 0.2;
			if (isRandomFailure) {
				reject('Random server error. Try again.');
			} else {
				resolve('Pretend remote server notified of action!');
			}
		}, 300);
	});
}
