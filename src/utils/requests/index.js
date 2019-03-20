import axios from 'axios';

async function fetchData(searchTerm) {
	return await axios({
		method: 'GET',
		url: `http://api.altmetric.com/v1/citations/1d?q=${searchTerm}`
	}).then(response => response.data).catch(error => {
		return {
			error: error.response.data
		};
	});
}

const services = {
	fetchData
};

export default services

