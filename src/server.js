const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const bodyParser = require("body-parser");

const { schema } = require("./schema");

const PORT = process.env.PORT || 3000;
const app = express();


app.post(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true,
    context: {
      secrets: {
        TM_API_KEY: "somekeyherejustasanexample"
      }
    }
  })
);

const gql = String.raw;

app.get(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    query: gql`
      query UpcomingEvents {
        myFavoriteArtists {
          name
          twitterUrl
          events {
            name
            startDateTime
          }
        }
      }
    `
  })
);

app.use(express.static("public"));



app.listen(PORT, () =>{
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});