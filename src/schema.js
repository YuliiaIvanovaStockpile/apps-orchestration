const { makeExecutableSchema } = require("graphql-tools");
const gql = String.raw;

import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './schemas'));
const typeDefs = mergeTypes(typesArray, { all : true });

// for some reason, the fileLoader is not working for the resolvers
// const resolversArray = fileLoader(path.join(__dirname, './resolvers'));
// const resolvers = mergeResolvers(resolversArray);

// for now, individually add the resolvers
import ArtistResolver from './resolvers/artist';
import UserResolver from './resolvers/user';
import Onboarding from './resolvers/onboarding';
const resolvers = [ ArtistResolver, UserResolver, Onboarding ];


console.log(resolvers);

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

