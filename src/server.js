import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from './schema';
const app = express();
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

app.use('/', (req, res, next) =>{
    // we can use this as the entry point for our react app
    res.send('hello there');
});
export default app;