import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery, deleteBookMutation } from '../queries/queries';

import BookDetails from './BookDetails';

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
		};
	}
	deleteBook = e => {
		if (e.target.value === this.state.selected) {
			this.setState({
				selected: null,
			});
		}
		this.props.deleteBook({
			variables: {
				id: e.target.value,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	};

	selectBook(id) {
		this.setState({
			selected: id,
		});
	}

	renderContent() {
		const { error, loading, books } = this.props.books;

		if (loading) {
			return <p>Loading books...</p>;
		}

		if (error) {
			return <p>Sorry, there was an errror while fetching {':('}</p>;
		}

		return books.map(book => {
			return (
				<div className="book-item" key={book.id}>
					<li onClick={this.selectBook.bind(this, book.id)}>{book.name}</li>
					<button
						className="delete-button"
						value={book.id}
						onClick={this.deleteBook}
					>
						x
					</button>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<ul className="book-list">
					{this.renderContent()}
					<BookDetails bookId={this.state.selected} />
				</ul>
			</div>
		);
	}
}

export default compose(
	graphql(getBooksQuery, { name: 'books' }),
	graphql(deleteBookMutation, { name: 'deleteBook' })
)(BookList);
