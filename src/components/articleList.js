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
			<style>
				@import "src/style/articleList.css";
			</style>
		`;
	};

	render(articles) {
		this.shadowDOM.innerHTML = '';

		this.shadowDOM.innerHTML = `
			${this.style()}

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
			${this.style()}

			<h1 class="center">loading...</h1>
		`;
	};
};

customElements.define('article-list', ArticleList);