import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const onlineLink = createHttpLink({
  uri: '/graphql'
});

const authorizationLink = setContext((_, { headers }) => {
  const id = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers
      , authorization: id ? `Bearer ${id}` : ''
    }
  };
});

const clientData = new ApolloClient({
  link: authorizationLink.concat(onlineLink)
  , cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={clientData}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
