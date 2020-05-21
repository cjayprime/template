import { onError } from 'apollo-link-error';
import  { store } from 'bundles/client/components/Redux/Provider';
import { logout } from 'bundles/setting/actions';
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

    if (networkError && networkError.statusCode === 401 || networkError && networkError.statusCode === 500) {
        // remove cached token on 401 from the server
        console.log('Authentication failed')
        store.dispatch(logout(true)); 
      }
})

export default errorLink;