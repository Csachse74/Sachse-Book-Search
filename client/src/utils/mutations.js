import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(email: $email, username: $username, password: $password) {
            user {
                _id
                username
            }
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                _id
                username
            }
            token
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            email
            username
            savedBooks {
                bookId
                title
                description
                authors
                link
                image
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            email
            username
            savedBooks {
                bookId
                title
                description
                authors
                link
                image
            }
        }
    }
`;
