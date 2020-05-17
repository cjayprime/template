import { ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import http from './http';
import errorLink from './error';
import authLink from './auth';
import loggerLink from './logger';
import wsLink from './ws';


const httpLink = ApolloLink.from([
    loggerLink,
    errorLink,
    authLink,
    http,
])
 
const wsHTTPLink = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  ); 

export default wsHTTPLink;
