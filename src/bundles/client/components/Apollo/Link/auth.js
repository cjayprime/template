import { ApolloLink } from 'apollo-link';
import  { store } from 'bundles/client/components/Redux/Provider';
import { logout } from 'bundles/setting/actions';

export const signOut = () => {
    localStorage.removeItem('Tokens::Authorization')
    localStorage.removeItem('Users::Current');
    store.dispatch(logout(true)); 
}

const getAccessToken = () => localStorage.getItem('Tokens::Authorization')

export const isAuthentcatedUser = () => {
    const token = localStorage.getItem('Tokens::Authorization')

    if(!token) return false

    const jwt = JSON.parse(atob(token.split('.')[1]))
    const expiration = jwt.exp

    const BUFFER = 300

    const currentDate = Date.now().valueOf() / 1000

    const valid = expiration > currentDate + BUFFER

    if(!valid) {
        signOut()
    }

    return valid
};
 
const setAuthHeader = () => {
  const authorization = getAccessToken();

  return {
    headers: {
      authorization
    }
  };
};

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(setAuthHeader);

  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;

    //  const cognitoAuthUser = headers.get('')

    return response;
  });
});

export default authLink;
