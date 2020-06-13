class AppBar extends HTMLElement {

	constructor() {
		super();
		this.shadowDOM = this.attachShadow({mode: 'open'})
		this.render();

		const categories = this.shadowDOM.querySelectorAll('.category');
		const articleListElement = document.querySelector('article-list');

		categories.forEach(category => {
			category.addEventListener('click', () => {
				articleListElement.setUserRequest = {category: category.innerText};
			});
		});
	};

	render() {
		this.shadowDOM.innerHTML = `
			<style>
				@import "src/style/appBar.css";
			</style>

			<header>
				<nav>
					<ul>
						<li class="category">general</li>
						<li class="category">business</li>
						<li class="category">entertainment</li>
						<li class="category">health</li>
						<li class="category">science</li>
						<li class="category">sports</li>
						<li class="category">technology</li>		      
					</ul>
				</nav>
			</header>
		`;
	};
};

customElements.define('app-bar', AppBar);