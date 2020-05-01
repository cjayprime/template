import { onError } from 'apollo-link-error';

const errorLink = onError((keys) => {
    const { operation, response, graphQLErrors, networkError } = keys

    if(graphQLErrors) {
        console.log('A GraphQL error occured');
        console.log({operation, response, graphQLErrors});
    }

    if(networkError) {
        console.log('A network Error occured');
        console.log({operation, response, graphQLErrors});     
    }
})

export default errorLink;