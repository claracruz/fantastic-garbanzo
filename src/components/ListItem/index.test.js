import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { ListItem } from '../../components/ListItem';

describe('<ListItem />', () => {

	let props;

	beforeEach(() => {
		props = {
			item: {
				altmetric_id: 112,
				details_url: 'http://url/detail',
				title: 'title',
				url: 'http://url',
				published_on: 430,
				score: 20,
				images: {
					small: '/img/path/small',
					medium: '/img/path/medium',
					large: '/img/path/large',
				}
			}
		};
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<ListItem {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders correctly', () => {
		const wrapper = shallow(<ListItem {...props} />);
		const instance = wrapper.instance();
		expect(wrapper).toMatchSnapshot();
		expect(instance).toBe(null);

	});
});
