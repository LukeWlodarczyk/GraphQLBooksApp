import { gql } from 'apollo-boost';

export const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

export const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

export const getBookQuery = gql`
	query GetBook($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;

export const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
		}
	}
`;

export const deleteBookMutation = gql`
	mutation($id: ID!) {
		deleteBook(id: $id) {
			id
		}
	}
`;

export const addAuthorMutation = gql`
	mutation($name: String!, $age: Int!) {
		addAuthor(name: $name, age: $age) {
			name
			age
		}
	}
`;
