window.addEventListener('load', () => {
	const jokeEl = document.querySelector('.joke');
	const jokeContainerEl = document.querySelector('.joke__container');
	const jokeProgressEl = document.querySelector('.joke__progress');
	const btnEl = document.querySelector('.btn');
	const API_KEY = '5134f0b021ab45e9a73eb60c2310f1ba';

	async function getJoke() {
		try {
			const res = await fetch(
				'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit'
			);
			const data = await res.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	async function loadJoke() {
		try {
			jokeEl.classList.add('joke--active');
			jokeContainerEl.innerHTML = '';
			const data = await getJoke();
			let jokeText;

			if (data.type === 'single') {
				jokeContainerEl.innerHTML = `${data.joke}`;
				jokeText = `${data.joke}`;
			}

			if (data.type === 'twopart') {
				jokeContainerEl.innerHTML = `${data.setup} <br> ${data.delivery}`;
				jokeText = `${data.setup} ${data.delivery}`;
			}

			VoiceRSS.speech({
				key: API_KEY,
				src: jokeText,
				hl: 'en-us',
				v: 'Linda',
				r: 0,
				c: 'mp3',
				f: '44khz_16bit_stereo',
				ssml: false,
			});
		} catch (error) {
			console.error(error);
		}
	}

	btnEl.addEventListener('click', () => {
		jokeEl.classList.remove('joke-time');
		loadJoke();
	});

	audioElement.addEventListener('play', function () {
		setTimeout(() => {
			btnEl.disabled = true;
			jokeEl.classList.add('joke-time');
			jokeProgressEl.style.animationDuration = +audioElement.duration + 5 + 's';
		}, 200);
	});

	audioElement.addEventListener('ended', () => {
		btnEl.disabled = false;
		setTimeout(() => {
			jokeEl.classList.remove('joke-time');
		}, 5000);
	});

	loadJoke();
});
