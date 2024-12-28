import { ApolloClient, InMemoryCache } from "@apollo/client";


export const client = new ApolloClient({
    uri: 'https://eu-west-2.cdn.hygraph.com/content/cm571q52p03ra07w3o5i1n39k/master',
    cache: new InMemoryCache()
})