import { ApolloLink } from 'apollo-link';
import httpLink from './http';
import errorLink from './error';
import authLink from './auth';
import loggerLink from './logger';

const link = ApolloLink.from([
    loggerLink,
    errorLink,
    authLink,
    httpLink
])

export default link;
