import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import services from '../../utils/requests';

describe('Services', () => {
	describe('fetchData', () => {
		it('returns expected response data', done => {
			const mock = new MockAdapter(axios);
			const param = 'test param';
			const data = {
				response: { data: [1,2,3,4,5,6,7]}
			};
			mock.onGet(`http://api.altmetric.com/v1/citations/1d?q=${param}`).reply(200, data);

			services.fetchData(param).then(response => {
				expect(response).toEqual(data);
				done();
			});
		});

		it('returns expected response error', done => {
			const mock = new MockAdapter(axios);
			const param = 'test param';
			const error = {
				response: { data: 'an error occurred'}
			};

			mock.onGet(`http://api.altmetric.com/v1/citations/1d?q=${param}`).reply(() => {
				return new Promise(function(resolve, reject) {
					reject(error);
				});
			});

			services.fetchData(param).then(response => {
				expect(response).toEqual({error: error.response.data});
				done();
			});
		});
	});
});

