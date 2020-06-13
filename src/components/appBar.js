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

			header {
				background: var(--primary-color);
				color: white;
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				z-index: 10;
			}

			nav {
				display: flex;
				justify-content: center;
			}

			ul {
				display: inherit;
				overflow: auto;
				padding: 0;
			}

			ul::before,
			ul::after {
				content: '';
				position: absolute;
				height: 100%;
			}

			ul::before {
				left: 0;
				width: 5%;
				background: linear-gradient(90deg, var(--primary-color) 15%, transparent)
			}

			ul::after {
				right: 0;
				width: 15%;
				background: linear-gradient(270deg, var(--primary-color) 60%, transparent)
			}

			li {
				list-style: none;
				padding: 0.5em;
				cursor: pointer;
			}

			li:hover {
				background: var(--secondary-color);
			}

			@media screen and (max-width: 630px) {
				li:last-child {
					padding-right: 3em;
				}
			}
		`;
	};

	render() {
		this.shadowDOM.innerHTML = `
			<style>
				${this.style()}
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