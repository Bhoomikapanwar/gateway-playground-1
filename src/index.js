const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const makeFetchHappenFetcher = require("make-fetch-happen").defaults({
  timeout: 2000
});

const gateway = new ApolloGateway({
  buildService: ({ name, url }) => {
    return new RemoteGraphQLDataSource({
      url,
      name,
      // ISSUE - here, we are passing an instance of make-fetch-happen fetcher (Fetch API complaint)
      // and it doesn't work correctly
      fetcher: makeFetchHappenFetcher
    });
  },
  serviceList: [{ name: "remoteService", url: "http://localhost:3000" }]
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

const port = 4000;
server.listen({port}).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
