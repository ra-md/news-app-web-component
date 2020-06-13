const API_KEY = '835c4fd1c5a9480082f6fcc812602952';
const URL_API = 'https://newsapi.org/v2';

function fetchAPI({ countryCode, category }) {
	return new Promise((resolve, reject) => {
		fetch(`${URL_API}/top-headlines
			?country=${countryCode}
			&category=${category}
			&apiKey=${API_KEY}`)
			.then(response => response.json())
			.then(responseJson => {
				resolve(responseJson.articles);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export default fetchAPI;
