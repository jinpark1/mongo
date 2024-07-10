import { ObjectId } from "mongodb";
export const typeDef = /* GraphQL */ `
  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(user: newUserInput!): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, update: updateUserInput): User
  }

  input newUserInput {
    name: String!
    email: String!
  }

  input updateUserInput {
    name: String!
  }

  type User {
    id: ID!
    name: String
    email: String

    comments: [Comment]
  }
`;

export const resolvers = {
  Query: {
    users: (obj, args, { mongo }) => {
      return mongo.users.find().limit(5).toArray();
    },
    user: (obj, { id }, { mongo }) => {
      console.log(id);
      return mongo.users.findOne({ _id: new ObjectId(String(id)) });
    },
  },

  Mutation: {
    createUser: async (_, { user }, { mongo }) => {
      const response = await mongo.users.insertOne(user);
      return {
        id: response.insertedId,
        ...user,
      };
    },
    deleteUser: async (obj, args, { mongo }) => {
      await mongo.users.deleteOne({ _id: new ObjectId(String(args.id)) });
      return true;
    },
    updateUser: async (obj, { id, update }, { mongo }) => {
      const response = await mongo.users.updateOne({ _id: new ObjectId(String(id)) }, { $set: { name: update.name } });
      console.log(response);
      return mongo.users.findOne({ _id: new ObjectId(String(id)) });
    },
  },

  User: {
    id: ({ id, _id }) => _id || id,
    name: (obj) => {
      return obj.name.trim().toUpperCase();
    },
    comments: ({ email }, args, { mongo }) => {
      return mongo.comments.find({ email }).limit(20).toArray();
    },
  },
};
