import { ApolloLink } from 'apollo-link';

const setAuthHeader = () => {
    const authorization = '' // jwt token generated

    return {
        headers: {
            authorization,
        }
    }
}

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(setAuthHeader)

    return forward(operation).map((response) => {
        const context = operation.getContext();
        const { response: { headers } } = context

      //  const cognitoAuthUser = headers.get('')
        

        return response
    })
})

export default authLink;