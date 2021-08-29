import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import './style/style.css';

//every piece of data is run through this function and gives every piece of data
//and use the id to identify the data
//this allows the apollo store to check for the need to rerender and communicate to react
//also allows you to not have to refetch your data when it changes 
//caching!!!!
const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <App />
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
