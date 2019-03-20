import React, { PureComponent } from 'react';
import { ListGrid } from '../../components/ListGrid/index';
import { SearchInput } from '../../components/SearchInput/index';
import { Loading } from '../../components/Loading/index';
import services  from '../../utils/requests';
import './index.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAtlas} from "@fortawesome/free-solid-svg-icons";
import classnames from 'classnames';

class App extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			loading: false,
			queryData: null,
			searchResults: [],
			searchTerm: ''
		}
	}

	onSearch = async (value) => {
		if (value) {
			this.setState({ loading: true });
			const data = await services.fetchData(value);
			this.onDataFetched(data, value);
		}
	};

	onDataFetched(data, value) {
		let newState = {
			loading: false
		};
		if (data.error) {
			Object.assign(newState, {
				error: `"${value}" ${data.error}`,
				queryData: null,
				searchResults: [],
				searchTerm: ''
			})
		} else {
			Object.assign(newState, {
				error: '',
				queryData: data.query,
				searchResults: data.results,
				searchTerm: value
			});
		}
		this.setState(newState);
	}

	showPaginationInfo(numberOfPages, currentPage) {
		const pageNodes = new Array(numberOfPages).fill(null);
		return <ul className="pagination">
			{
				pageNodes.map((node, index) => {
					const pageIndex = index + 1;
					return (
						<li key={`page_${pageIndex}`}>
							<button
								className={classnames({
									active: pageIndex === currentPage
								})}
								onClick={this.onNavigate}>{pageIndex}</button>
						</li>
					);
				})
			}
		</ul>
	}

	onNavigate() {
		//fetch pagination data
		alert('not implemented!')
	}

	render() {
		const { error, loading, queryData, searchResults, searchTerm } = this.state;
		const numPages = (queryData) ? Math.ceil(queryData.num_results/queryData.total) : null;

		return (
			<div className="App">
				<header className="App-header">
					<FontAwesomeIcon icon={faAtlas} />
					<h1>Search App</h1>
				</header>
				<nav>
					<SearchInput onSearch={this.onSearch} />
					{ error && <div className="error">{error}</div> }
				</nav>
				{ !!queryData &&
					<main>
						<span className="paginationInfo">
							<span>{`Page ${queryData.page}`}</span>
							<span> of </span>
							<span>{numPages}</span>
						</span>
						<h2>{`Showing ${searchResults.length} results of ${queryData.num_results} for "${searchTerm}"`}</h2>
						<ListGrid
							className="list-grid"
							items={searchResults} />
						{this.showPaginationInfo(numPages, queryData.page)}
					</main>
				}
				{ loading && <Loading /> }
			</div>
		);
	}
}

export default App;
