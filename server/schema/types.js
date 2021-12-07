const { gql } = require('apollo-server-express');

const types = gql`
    type User {
        _id: ID!
        email: String
        username: String!
        savedBooks: [Book]
        bookCount: Int
    }
    type Book {
        bookId: ID!
        title: String!
        description: String
        authors: [String]
        link: String
        image: String
    }
    type Auth {
        user: User
        token: ID!
    }
    input BookInput {
        bookId: String!
        title: String!
        description: String!
        authors: [String]
        link: String
        image: String
    }
    type Query {
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = types;
