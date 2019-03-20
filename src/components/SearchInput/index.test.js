import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { SearchInput } from '../../components/SearchInput';

describe('<SearchInput />', () => {

	let props;

	describe('Rendering', () => {
		beforeEach(() => {
			props = {
				onSearch: jest.fn()
			};
		});

		it('renders without crashing', () => {
			const div = document.createElement('div');
			ReactDOM.render(<SearchInput {...props} />, div);
			ReactDOM.unmountComponentAtNode(div);
		});

		it('renders correctly', () => {
			const wrapper = shallow(<SearchInput {...props} />);
			const searchInput = wrapper.find('input');
			const h2 = wrapper.find('h2');
			expect(wrapper).toMatchSnapshot();
			expect(searchInput.length).toBe(1);
			expect(h2.length).toBe(1);
		});

	});

	describe('State handling', () => {
		beforeEach(() => {
			props = {
				onSearch: jest.fn()
			};
		});

		it ('renders with default state', () => {
			const wrapper = shallow(<SearchInput {...props} />);
			expect(wrapper.instance().state).toEqual({ searchTerm: '' });
		});

		it('renders as expected when state has searchTerm', () => {
			const wrapper = shallow(<SearchInput {...props} />);
			const searchTerm = 'test';
			wrapper.instance().setState({ searchTerm });
			expect(wrapper).toMatchSnapshot();

			const searchInput = wrapper.find('input');
			expect(searchInput.props().value).toEqual(searchTerm);
		});
	});

	describe('Input events', () => {
		beforeEach(() => {
			props = {
				onSearch: jest.fn()
			};
		});

		it('can handle keypress event', () => {
			const wrapper = shallow(<SearchInput {...props} />);
			const instance = wrapper.instance();
			const searchTerm = 'search term';
			const eventObj = { currentTarget: { value: searchTerm } };

			wrapper.find('input').simulate('keyPress', eventObj);
			expect(instance.state.searchTerm).toEqual(searchTerm);
		});

		it('Can handle change event', () => {
			const wrapper = shallow(<SearchInput {...props} />);
			const instance = wrapper.instance();
			const searchTerm = 'search term';
			const eventObj = { currentTarget: { value: searchTerm } };

			wrapper.find('input').simulate('change', eventObj);
			expect(instance.state.searchTerm).toEqual(searchTerm);
		});

		it('can handle enter key press', () => {
			const wrapper = shallow(<SearchInput {...props} />);
			const instance = wrapper.instance();
			const input = wrapper.find('input');
			const searchTerm = 'search term';
			instance.setState({ searchTerm });
			input.simulate('keyDown', {
				key: 'Enter',
				currentTarget: { value: searchTerm }
			});
			expect(props.onSearch).toBeCalledWith(searchTerm);
		});

		it('should handle search button click as expected', () => {
			const wrapper = shallow(<SearchInput {...props} />);
			const input = wrapper.find('input');
			const button = wrapper.find('button');
			const searchTerm = 'search term';
			input.simulate('keyPress', {currentTarget: {value: searchTerm}});
			button.simulate('click');
			expect(props.onSearch).toBeCalledWith(searchTerm);
		});
	});

	describe('onSubmit()', () => {
		beforeEach(() => {
			props = {
				onSearch: jest.fn()
			};
		});
	});
});
