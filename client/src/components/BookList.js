import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
	renderContent() {
		const { error, loading, books } = this.props.data;

		if (loading) {
			return <p>Loading books...</p>;
		}

		if (error) {
			return <p>Sorry, there was an errror while fetching {':('}</p>;
		}

		const content = books.map(book => {
			return <li key={book.id}>{book.name}</li>;
		});

		return content;
	}

	render() {
		return (
			<div>
				<ul id="book-list">
					<p>Books</p>
					{this.renderContent()}
				</ul>
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);
