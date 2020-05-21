import React from 'react';
import { ApolloClient, InMemoryCache} from '@apollo/client';
import { ApolloProvider }  from '@apollo/react-hooks';
import link from './Link';


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    queryDeduplication: false,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
          },
        query: {
            errorPolicy: "ignore"
        },
    },
});

const Provider = (props) => <ApolloProvider client={client} {...props} />

export default Provider;