import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { ListGrid } from '../../components/ListGrid';

describe('<ListGrid />', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<ListGrid />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders correctly', () => {
		const wrapper = shallow(<ListGrid />);
		const instance = wrapper.instance();
		expect(wrapper).toMatchSnapshot();
		expect(instance).toBe(null);

	});
});
