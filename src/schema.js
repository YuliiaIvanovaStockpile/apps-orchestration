// Welcome to Launchpad!
// Log in to edit and save pads, and run queries in GraphiQL on the right.

import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
    mergeSchemas,
  } from 'graphql-tools';
  
  // Mocked chirp schema; we don't want to worry about schema implementation
  // right now since we're just demonstrating schema stitching
  const chirpSchema = makeExecutableSchema({
    typeDefs: `
      type Chirp {
        id: ID!
        text: String
        authorId: ID!
      }
  
      type Query {
        chirpById(id: ID!): Chirp
        chirpsByAuthorId(authorId: ID!): [Chirp]
      }
    `
  });
  
  addMockFunctionsToSchema({ schema: chirpSchema });
  
  // Mocked author schema
  const authorSchema = makeExecutableSchema({
    typeDefs: `
      type User {
        id: ID!
        email: String
      }
  
      type Query {
        userById(id: ID!): User
      }
    `
  });
  
  // This function call adds the mocks to your schema!
  addMockFunctionsToSchema({ schema: authorSchema });
  
  // Extend schema with new fields
  const linkTypeDefs = `
    extend type User {
      chirps: [Chirp]
    }
  
    extend type Chirp {
      author: User
    }
  `;
  
  export const schema = mergeSchemas({
    schemas: [chirpSchema, authorSchema, linkTypeDefs],
    resolvers: mergeInfo => ({
      User: {
        chirps: {
          fragment: `fragment UserFragment on User { id }`,
          resolve(parent, args, context, info) {
            const authorId = parent.id;
            return mergeInfo.delegate(
              'query',
              'chirpsByAuthorId',
              {
                authorId,
              },
              context,
              info,
            );
          },
        },
      },
      Chirp: {
        author: {
          fragment: `fragment ChirpFragment on Chirp { authorId }`,
          resolve(parent, args, context, info) {
            const id = parent.authorId;
            return mergeInfo.delegate(
              'query',
              'userById',
              {
                id,
              },
              context,
              info,
            );
          },
        },
      },
    }),
  });
  
  