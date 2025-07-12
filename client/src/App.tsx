import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import Medicine from "./component/MedicineResult"

const httpLink = createHttpLink({
  uri: "/graphql"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Medicine />
    </ApolloProvider>
  )
}

export default App
