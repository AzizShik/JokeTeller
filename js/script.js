window.addEventListener('load', () => {
	const jokeEl = document.querySelector('.joke');
	const tts = window.speechSynthesis;
	const btnEl = document.querySelector('.btn');

	async function getJoke() {
		const res = await fetch(
			'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit'
		);
		const data = await res.json();
		return data;
	}

	async function loadJoke() {
		jokeEl.classList.add('joke--active');
		jokeEl.innerHTML = '';
		const data = await getJoke();

		if (data.type === 'single') {
			jokeEl.innerHTML = `${data.joke}`;
			convertTextToSpeech(data.joke);
		}

		if (data.type === 'twopart') {
			jokeEl.innerHTML = `${data.setup} <br> ${data.delivery}`;
			const text = `${data.setup} ${data.delivery}`;
			convertTextToSpeech(text);
		}
	}

	function convertTextToSpeech(text) {
		const utterance = new SpeechSynthesisUtterance(text.trim());
		utterance.voice = tts.getVoices()[3];
		utterance.picth = 1;
		utterance.rate = 1;
		tts.speak(utterance);
	}

	btnEl.addEventListener('click', loadJoke);
	loadJoke();
});
