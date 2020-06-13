class SelectCountry extends HTMLElement {

	constructor() {
		super();
		this.shadowDOM = this.attachShadow({mode: 'open'})
		this.render();

		const overlay = this.shadowDOM.querySelector('.overlay');
		const modal = this.shadowDOM.querySelector('.modal');
		const btnOpenModal = this.shadowDOM.querySelector('.btn-open-modal');
		const btnCloseModal = this.shadowDOM.querySelector('.btn-close-modal');
		const countries = this.shadowDOM.querySelectorAll('.country');
		const articleListElement = document.querySelector('article-list');

		const showModal = () => {
			return overlay.style.display = 'block', modal.style.display = 'block';
		};

		const hideModal = () => {
			return overlay.style.display = 'none', modal.style.display = 'none';
		};

		btnOpenModal.addEventListener('click', () => {
			showModal();
		})

		btnCloseModal.addEventListener('click', () => {
			hideModal();
		});

		overlay.addEventListener('click', () => {
			hideModal();
		})

		countries.forEach(country => {
			country.addEventListener('click', () => {
				articleListElement.setUserRequest = {
					countryCode: country.getAttribute('value'),
					country: country.innerText
				};
				hideModal();
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

			.overlay {
				background: rgba(0,0,0,0.5);
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 11;
				display: none;
			}

			.btn-open-modal {
				position: fixed;
				z-index: 10;
				top: 0.5em;
				right: 0.5em;
				background: transparent;
				border: none;
				color: white;
				cursor: pointer;
			}

			.modal {
				position: fixed;
			    top: 50%;
			    left: 50%;
			    transform: translate(-50%, -50%);
			    z-index: 12;
			    background: white;
			    border-radius: 5px;
			    width: 16em;
			    display: none;
			}

			h3 {
				color: black;
				cursor: default;
			}

			ul {
				text-align: center;
				padding: 0;
			}

			li {
				list-style: none;
				border-bottom: 1px solid #ccc;
				color: #157afb;
				padding: 0.5em;
				cursor: pointer;
			}

			li:last-child {
				color: red;
				border-bottom: none;
			}

			.country:hover,
			.btn-close-modal:hover {
				background: #ccc;
			}
		`;
	};

	render() {
		this.shadowDOM.innerHTML = `
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">

			<style>
				${this.style()}
			</style>

			<button class="btn-open-modal"><i class="fas fa-ellipsis-v"></i></button>

			<div class="overlay"></div>
			<div class="modal">
				<ul>
			 		<li><h3>Pilih negara</h3></li>
			 		<li class="country" value="us">United States</li>
					<li class="country" value="id">Indonesia</li>
			 		<li class="country" value="sg">Singapore</li>
			 		<li class="country" value="my">Malaysia</li>
			 		<li class="country" value="gb">United Kingdom</li>
			 		<li class="btn-close-modal">Cancel</li>
			 	</ul>
			</div>
		`;
	};

}

customElements.define('select-country', SelectCountry);