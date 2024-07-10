export const typeDef = /* GraphQL */ `
  type Query {
    user: User
  }

  type Mutation {
    createUser(user: newUserInput!): User
  }

  input newUserInput {
    name: String!
    age: Int!
  }

  type User {
    id: Int
    name: String
    age: Int
  }
`;

export const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: "Jin",
        age: 19,
      };
    },
  },

  Mutation: {
    createUser: async (_, { user }, { mongo }) => {
      const movies = await mongo.movies.find().toArray();
      console.log(movies);
      return {
        id: 1,
        ...user,
      };
    },
  },

  User: {
    name: (obj) => {
      return obj.name.trim().toUpperCase();
    },
  },
};
