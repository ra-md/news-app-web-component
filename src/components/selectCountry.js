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

	render() {
		this.shadowDOM.innerHTML = `
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">

			<style>
				@import "src/style/selectCountry.css";
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