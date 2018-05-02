import { makeExecutableSchema } from 'graphql-tools';
// const TypeDefinition = `
//   type RootQuery {
//     hello_world: String!
//    }
// `;
// const SchemaDefinition = `
//   schema {
//     query: RootQuery
//   }
// `;

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id: id }),
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: (post) => find(authors, { id: post.authorId }),
  },
};

// export default makeExecutableSchema({
//  typeDefs: [SchemaDefinition, TypeDefinition],
//  resolvers: {
//    RootQuery: {
//      hello_world: () => "Hi from GraphQL!"
//    }
//  }
// });

export default makeExecutableSchema({
    typeDefs : typeDefs,
    resolvers : resolvers
});