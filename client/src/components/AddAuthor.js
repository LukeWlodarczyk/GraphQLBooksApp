import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addAuthorMutation, getAuthorsQuery } from '../queries/queries';

class AddAuthor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			age: '',
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { name, age } = this.state;

		const isValid = name && age;

		if (!isValid) return;

		this.props
			.addAuthor({
				variables: {
					name,
					age,
				},
				refetchQueries: [{ query: getAuthorsQuery }],
			})
			.then(() => {
				this.setState({
					name: '',
					age: '',
				});
			});
	};

	render() {
		return (
			<form className="add-book" onSubmit={this.handleSubmit}>
				<div className="field">
					<label>Author name:</label>
					<input
						name="name"
						value={this.state.name}
						type="text"
						onChange={this.handleChange}
					/>
				</div>
				<div className="field">
					<label>Age:</label>
					<input
						name="age"
						value={this.state.age}
						type="text"
						onChange={this.handleChange}
					/>
				</div>
				<button>+</button>
			</form>
		);
	}
}

export default compose(graphql(addAuthorMutation, { name: 'addAuthor' }))(
	AddAuthor
);
