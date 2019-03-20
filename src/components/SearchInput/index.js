import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './index.scss';

export class SearchInput extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ''
		}
	}

	onSubmit = () => {
		this.props.onSearch(this.state.searchTerm);
	};

	handleChange = (e) => {
		this.setState({
			searchTerm: e.currentTarget.value
		});
	};

	handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.onSubmit();
		}
	};

	render() {
		return (
			<div className="wrap">
				<h2><label htmlFor="search">Search Papers</label></h2>
				<div className="search">
					<input
						id="search"
						className="search-input"
						value={this.state.searchTerm}
						onKeyPress={this.handleChange}
						onKeyDown={this.handleKeyDown}
						onChange={this.handleChange}
						placeholder="Enter a search term"
						type="text" />
					<button className="searchButton" onClick={this.onSubmit}><FontAwesomeIcon icon={faSearch} /></button>
				</div>
			</div>
		);
	}
}

SearchInput.propTypes = {
	onSearch: PropTypes.func.isRequired
};
