import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Loading } from '../../components/Loading';

describe('<Loading />', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Loading />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders correctly', () => {
		const wrapper = shallow(<Loading />);
		const instance = wrapper.instance();
		expect(wrapper).toMatchSnapshot();
		expect(instance).toBe(null);

	});
});
