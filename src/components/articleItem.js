class ArticleItem extends HTMLElement {

	constructor() {
		super();
		this.shadowDOM = this.attachShadow({mode: 'open'})
		this._article;
	};

	set setArticle(article) {
		this._article = article;
		this.render();
		this.eventListener();
	};

	eventListener() {
		const urlBar = this.shadowDOM.querySelector('.url-bar');
		const btnOpen = this.shadowDOM.querySelector('.btn-open-url-bar');
		const input = this.shadowDOM.querySelector('input');
		const btnCopy = this.shadowDOM.querySelector('.btn-copy');

		btnOpen.addEventListener('click', () => {
			urlBar.classList.toggle('show-url-bar');
		});

		btnCopy.addEventListener('click', () => {
			input.select();
			input.setSelectionRange(0, 999);
			document.execCommand('copy');

			btnCopy.innerText = 'copied';

			setTimeout(() => {
				btnCopy.innerText = 'Copy Link';
				urlBar.classList.remove('show-url-bar')
			}, 3000);
		});

	};

	style() {
		return `
			* {
				margin: 0;
				box-sizing: border-box;
			}

			:host {
				--primary-color: #db4d3f;
				--secondary-color: #c23426;
			}

			a {
				color: black;
				text-decoration: none;
			}

			article {
				padding: 1em;
				border-radius: 5px;
				box-shadow: 0 0 10px 3px rgba(0,0,0,0.2);
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
			}

			img {
			    width: 100%;
			    height: 10em;
			    object-fit: cover;
			}

			.tanggal {
				margin: 0.5em 0;
			}

			p {
				margin: 1em 0;
			}

			h3:hover, p:hover {
				text-decoration: underline;
			}

			.article-bar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
			}

			.article-bar span{
				font-weight: bold;
			}

			.btn-open-url-bar {
				border: 2px solid black;
				font-weight: bold;
				background: transparent;
				border-radius: 5px;
				padding: 0.5em 1.2em;
			}

			.btn-open-url-bar:hover {
				background: black;
				color: white;
			}

			.url-bar {
				position: absolute;
				top: -4em;
				right: 0;
				padding: 0.5em;
				background: white;
				width: 100%;
				border: 2px solid black;
				display: none;
			}

			.show-url-bar {
				display: flex;
			}

			.url-bar input {
				flex: 1;
				margin-right: 0.5em;
			}

			.btn-copy {
				background: black;
				color: white;
				border: none;
				cursor: pointer;
				width: 8em;
				height: 2.5em;
			}

			.btn-copy:hover {
				background: var(--primary-color);
			}
		`;
	};

	render() {
		const tanggal = this._article.publishedAt.split('').slice(0, 9).join('');

		this.shadowDOM.innerHTML = `
			<style>
				${this.style()}
			</style>

			<article>
				<a href="${this._article.url}" target="_blank">
					<img loading="lazy" src="${this._article.urlToImage}">
					<h3 class="tanggal">${tanggal}</h3>
					<section>
						<h3>${this._article.title}</h3>
						<p>${this._article.description}</p>
					</section>
				</a>
				<div class="article-bar">
					<span>${this._article.source.name}</span>
					<button class="btn-open-url-bar">Copy Link</button>
					<div class="url-bar">
						<input value="${this._article.url}"></input>
						<button class="btn-copy">Copy Link</button>
					</div>
				</div>	
			</article>
		`;
	};
};

customElements.define('article-item', ArticleItem);