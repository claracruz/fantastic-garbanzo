import React from 'react';
import App  from './index';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import services  from '../../utils/requests';
import { ListGrid } from '../../components/ListGrid';
import { Loading } from '../../components/Loading';
import enzymeSerializer from 'enzyme-to-json/serializer';

expect.addSnapshotSerializer(enzymeSerializer);

describe('<App />', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders correctly', () => {
		const wrapper = shallow(<App />);
		const searchInput = wrapper.find('SearchInput');
		const h1 = wrapper.find('h1');
		expect(wrapper).toMatchSnapshot();
		expect(searchInput.length).toBe(1);
		expect(h1.length).toBe(1);
	});

	describe('State handling', () => {
		it ('renders with default state', () => {
			const wrapper = shallow(<App />);
			expect(wrapper.instance().state).toEqual({
				error: '',
				loading: false,
				queryData: null,
				searchResults: [],
				searchTerm: ''
			});
		});

		it('renders as expected when loading state occurs', () => {
			const wrapper = shallow(<App />);
			wrapper.instance().setState({loading: true});
			expect(wrapper).toMatchSnapshot();

			const loading = <Loading />;
			expect(wrapper.contains(loading)).toEqual(true);
		});

		it('renders as expected when state has data', () => {
			const wrapper = shallow(<App />);
			const queryData = {total: 12, page: 1, num_results: 25};
			const searchResults = [
				{ altmetric_id: 122, title: 'title1', url: 'http://url/1', details_url: 'http://detailsUrl/1'},
				{ altmetric_id: 234, title: 'title2', url: 'http://url/2', details_url: 'http://detailsUrl/1'},
				{ altmetric_id: 543, title: 'title3', url: 'http://url/3', details_url: 'http://detailsUrl/1'}
			];
			const searchTerm = 'test term';

			wrapper.instance().setState({searchResults, searchTerm, queryData});
			expect(wrapper).toMatchSnapshot();

			const listGrid = wrapper.find('ListGrid');
			expect(listGrid.props().items).toEqual(searchResults);

			const paginationInfo = wrapper.find('.paginationInfo');
			expect(paginationInfo.length).toBe(1);
			expect(paginationInfo.text()).toEqual('Page 1 of 3');

			const resultsInfo = wrapper.find('h2');
			expect(resultsInfo.length).toBe(1);
			expect(resultsInfo.text()).toEqual(`Showing 3 results of 25 for "${searchTerm}"`);
		});

		it('renders as expected when error state occurs', () => {
			const wrapper = shallow(<App />);
			const error = 'This is a test error';

			wrapper.instance().setState({error});
			expect(wrapper).toMatchSnapshot();

			const errorNode = wrapper.find('.error');
			expect(errorNode.length).toBe(1);
			expect(errorNode.text()).toEqual(error);
		});
	});

	describe('onSearch()', () => {
		it('handles onSearch() as expected when no search term passed', () => {
			const wrapper = shallow(<App />);

			services.fetchData = jest.fn(() => Promise.resolve({ }));
			wrapper.instance().onSearch();
			expect(services.fetchData.mock.calls.length).toBe(0);
			expect(wrapper).toMatchSnapshot();
		});

		it('handles onSearch() as expected when data returned', async () => {
			const wrapper = shallow(<App />);
			const searchTerm = 'test search term';
			const queryData = {total: 12, page: 1, num_results: 25};
			const searchResults = [
				{ altmetric_id: 122, title: 'title1', url: 'http://url/1', details_url: 'http://detailsUrl/1'},
				{ altmetric_id: 234, title: 'title2', url: 'http://url/2', details_url: 'http://detailsUrl/1'},
				{ altmetric_id: 543, title: 'title3', url: 'http://url/3', details_url: 'http://detailsUrl/1'}
			];

			wrapper.instance().setState = jest.fn();
			services.fetchData = jest.fn(() => Promise.resolve({ query: queryData, results: searchResults }));
			await wrapper.instance().onSearch(searchTerm);

			expect(services.fetchData.mock.calls.length).toBe(1);
			expect(services.fetchData.mock.calls[0][0]).toEqual(searchTerm);

			const setStateMock = wrapper.instance().setState;
			expect(setStateMock.mock.calls.length).toBe(2);
			expect(setStateMock.mock.calls[0][0]).toEqual({ loading: true });
			expect(setStateMock.mock.calls[1][0]).toEqual({
				loading: false,
				error: '',
				queryData,
				searchResults,
				searchTerm
			});

			expect(wrapper).toMatchSnapshot();


		});

		it('handles onSearch() as expected when error response received', async () => {
			const wrapper = shallow(<App />);
			const searchTerm = 'test search term';
			const error = 'this is a test error response';

			wrapper.instance().setState = jest.fn();
			services.fetchData = jest.fn(() => Promise.resolve({ error }));
			await wrapper.instance().onSearch(searchTerm);

			expect(services.fetchData.mock.calls.length).toBe(1);
			expect(services.fetchData.mock.calls[0][0]).toEqual(searchTerm);

			const setStateMock = wrapper.instance().setState;
			expect(setStateMock.mock.calls.length).toBe(2);
			expect(setStateMock.mock.calls[0][0]).toEqual({ loading: true });
			expect(setStateMock.mock.calls[1][0]).toEqual({
				error: `"${searchTerm}" ${error}`,
				loading: false,
				queryData: null,
				searchResults: [],
				searchTerm: ""
			});

			expect(wrapper).toMatchSnapshot();
		});
	});
});
