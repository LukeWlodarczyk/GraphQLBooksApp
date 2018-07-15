import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import Toggle from './components/Toggle';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div className="main">
					<h1>Reading List</h1>
					<BookList />
					<Toggle>
						{({ toggle }) => (toggle ? <AddBook /> : <AddAuthor />)}
					</Toggle>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
