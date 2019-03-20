import React  from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../ListItem';
import './index.scss';


function displayData (props) {
	const { items } = props;
	return items.map((item) => {
		return (
			<ListItem key={item.altmetric_id} item={item}/>
		);
	})
}

export const ListGrid = (props) => {
	const { className, items } = props;
	const hasData = items.length > 0;

	return (
		<>
			{
				hasData &&
				<ul className={className}>{displayData(props)}</ul>
			}
		</>
	);
};

ListGrid.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			altmetric_id: PropTypes.number,
			title: PropTypes.string,
			url: PropTypes.string,
			details_url: PropTypes.string,
			published_on: PropTypes.number,
			score: PropTypes.number,
			images: PropTypes.shape({
				small: PropTypes.string,
				medium: PropTypes.string,
				large: PropTypes.string
			}),
		})
	)
};

ListGrid.defaultProps = {
	items: []
};
