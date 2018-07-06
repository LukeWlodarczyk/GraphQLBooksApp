import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery,
} from '../queries/queries';

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorId: '',
		};
	}
	renderOptions() {
		const { error, loading, authors } = this.props.authors;

		if (loading) {
			return <option>Loading books...</option>;
		}

		if (error) {
			return <option>Error</option>;
		}

		const content = authors.map(author => {
			return (
				<option key={author.id} value={author.id}>
					{author.name}
				</option>
			);
		});

		return content;
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		this.setState({
			name: '',
			genre: '',
			authorId: '',
		});

		this.props.addBook({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	};

	render() {
		return (
			<form id="add-book" onSubmit={this.handleSubmit}>
				<div className="field">
					<label>Book name:</label>
					<input
						name="name"
						value={this.state.name}
						type="text"
						onChange={this.handleChange}
					/>
				</div>
				<div className="field">
					<label>Genre:</label>
					<input
						name="genre"
						value={this.state.genre}
						type="text"
						onChange={this.handleChange}
					/>
				</div>
				<div className="field">
					<label>Author:</label>
					<select
						name="authorId"
						value={this.state.authorId}
						onChange={this.handleChange}
					>
						<option>Select author</option>
						{this.renderOptions()}
					</select>
				</div>
				<button>+</button>
			</form>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: 'authors' }),
	graphql(addBookMutation, { name: 'addBook' })
)(AddBook);
