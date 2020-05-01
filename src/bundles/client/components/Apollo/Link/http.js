import { createHttpLink } from 'apollo-link-http';

const httpLink = new createHttpLink({
    uri: 'http://localhost:3000/graphql'
})

export default httpLink;