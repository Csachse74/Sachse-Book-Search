import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import { REMOVE_BOOK } from '../utils/mutations.js';


const SavedBooks = () => {
  // const [userData, setUserData] = useState({});
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // const userDataLength = Object.keys(userData).length;
  const userInfo = data?.me || {};

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await deleteBook(bookId, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      const { data } = await removeBook({
        variables: { bookId }
      });
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing {userInfo.username}'s books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userInfo.savedBooks.length
            ? `Viewing ${userInfo.savedBooks.length} saved ${userInfo.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'User has no books saved!'}
        </h2>
        <CardColumns>
          {userInfo.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
