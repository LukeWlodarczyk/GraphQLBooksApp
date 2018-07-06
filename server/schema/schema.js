const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
} = graphql;

const books = [
	{ name: 'Dark', id: '1', genre: 'fantasy', authorId: '1' },
	{ name: 'Happy life', id: '2', genre: 'fantasy', authorId: '1' },
	{ name: 'Love', id: '3', genre: 'romance', authorId: '2' },
];

const authors = [
	{ name: 'Stephen King', id: '1', age: 33 },
	{ name: 'Suzan Mayers', id: '2', age: 34 },
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return authors.find(author => author.id === parent.authorId);
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books.filter(book => parent.id === book.authorId);
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//get data from db
				return books.find(book => book.id === args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//get data from db
				return authors.find(author => author.id === args.id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
