import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
	renderContent() {
		const { error, loading, book } = this.props.book;

		if (loading) {
			return <p>Loading book...</p>;
		}

		if (error) {
			return <p>Sorry, there was an error</p>;
		}

		if (!book) {
			return <p>No book selected</p>;
		}

		return (
			<div>
				<h2>{book.name}</h2>
				<p>{book.genre}</p>
				<p>{book.author.name}</p>
				<p>All books by this author:</p>
				<ul className="other-books">
					{book.author.books.map(item => {
						return <li key={item.id}>{item.name}</li>;
					})}
				</ul>
			</div>
		);
	}

	render() {
		return <div className="book-details">{this.renderContent()}</div>;
	}
}

export default compose(
	graphql(getBookQuery, {
		name: 'book',
		options: props => {
			return {
				variables: {
					id: props.bookId,
				},
			};
		},
	})
)(BookDetails);
