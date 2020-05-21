import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from "subscriptions-transport-ws";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true
  }
});


const client = new SubscriptionClient('ws://localhost:3000/graphql', {
  reconnect: true
});

const link = new WebSocketLink(client);

export default link;