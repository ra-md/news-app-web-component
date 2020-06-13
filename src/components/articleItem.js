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

	render() {
		const tanggal = this._article.publishedAt.split('').slice(0, 9).join('');

		this.shadowDOM.innerHTML = `
			<style>
				@import "src/style/articleItem.css";
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