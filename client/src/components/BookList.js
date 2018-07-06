import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery, deleteBookMutation } from '../queries/queries';

class BookList extends Component {
	deleteBook = e => {
		console.log(e.target.value);
		this.props.deleteBook({
			variables: {
				id: e.target.value,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	};

	renderContent() {
		const { error, loading, books } = this.props.books;

		if (loading) {
			return <p>Loading books...</p>;
		}

		if (error) {
			return <p>Sorry, there was an errror while fetching {':('}</p>;
		}

		const content = books.map(book => {
			console.log(book.id);
			return (
				<div key={book.id}>
					<li>{book.name}</li>
					<button value={book.id} onClick={this.deleteBook}>
						x
					</button>
				</div>
			);
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

export default compose(
	graphql(getBooksQuery, { name: 'books' }),
	graphql(deleteBookMutation, { name: 'deleteBook' })
)(BookList);
