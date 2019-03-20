import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import {faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	"'Dec"
];


export const ListItem = (props) => {
	const {altmetric_id, details_url, images, published_on, score, title, url} = props.item;
	const datePublished = (published_on) ? new Date(published_on * 1000) : null;

	return (
		<li key={altmetric_id} className="list-item">
			<img src={images.small} alt={title}/>
			<span className="date-published">
				<span className="day">{datePublished && datePublished.getDay()}</span>
		        <span className="month">{months[datePublished && datePublished.getMonth()]}</span>
		        <span className="year">{datePublished && datePublished.getFullYear()}</span>
			</span>
			<div className="content">
				<h3>{title}</h3>

				<div className="details">
					<span className="score">
						<FontAwesomeIcon icon={faStarHalfAlt} />
						<span>{score}</span>
					</span>
					<a href={details_url}
					   className="source"
					   target="_blank"
					   rel="noopener noreferrer" >View metrics data...</a>
					<a href={url}
					   className="source"
					   target="_blank"
					   rel="noopener noreferrer">Go to source...</a>
				</div>
			</div>
		</li>
	);
};


ListItem.propTypes = {
	item: PropTypes.shape({
		altmetric_id: PropTypes.number,
		details_url: PropTypes.string,
		title: PropTypes.string,
		url: PropTypes.string,
		published_on: PropTypes.number,
		score: PropTypes.number,
		images: PropTypes.shape({
			small: PropTypes.string,
			medium: PropTypes.string,
			large: PropTypes.string
		})
	})
};
