import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import SearchPage from "./pages/SearchPage";

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
      <SearchPage />
    </ApolloProvider>
  )
}

export default App
