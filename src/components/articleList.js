import fetchAPI from '../api'; 
import './articleItem.js';

class ArticleList extends HTMLElement {

	constructor() {
		super();

		this.shadowDOM = this.attachShadow({mode: 'open'})

		this._userRequest = {
			countryCode: 'us',
			country: 'United States',
			category: 'general'
		};

		this.renderLoading();
		this.articles();
	};

	set setUserRequest(newUserRequest) {

		for(let key in this._userRequest) {
			if(newUserRequest[key]) {
				this._userRequest[key] = newUserRequest[key]
			}
		};

		this.articles();
	};

	async articles() {
		this.renderLoading();

		const articles = await fetchAPI(this._userRequest);

		this.render(articles);
	};

	style() {
		return `
			:host {
				margin: 6em 0!important;
				display: grid;
				grid-gap: 2em;
			}

			.center {
				position: absolute;
				top: 3em;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				width: 100%;
				justify-content: center;
			}

			.center p {
				margin: 0.5em;
				font-size: 15px;
			}

			@media screen and (min-width: 768px) {
				:host {
					grid-template-columns: 1fr 1fr;
				}
			}

			@media screen and (min-width: 1024px) {
				:host {
					grid-template-columns: 1fr 1fr 1fr;
				}
			}
		`;
	};

	render(articles) {
		this.shadowDOM.innerHTML = '';

		this.shadowDOM.innerHTML = `
			<style>
				${this.style()}
			</style>

			<div class="center">
				<p>Kategori: ${this._userRequest.category}</p>
				<p>Negara: ${this._userRequest.country}</p>
			</div>
		`;

		articles.forEach(article => {
			const articleItemElement = document.createElement('article-item');
			articleItemElement.setArticle = article;
			this.shadowDOM.appendChild(articleItemElement);
		})

	};

	renderLoading() {
		this.shadowDOM.innerHTML = 	`
			<style>
				${this.style()}
			</style>

			<h1 class="center">loading...</h1>
		`;
	};
};

customElements.define('article-list', ArticleList);