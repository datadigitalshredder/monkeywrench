const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const Model = require("./models/models");
require("dotenv").config();

// MongoDB connection URL
const MONGODB_URL = process.env.URI; // Replace with your MongoDB URL

// Example resolvers
const resolvers = {
  Query: {
    user: async (args, context) => {
      return users[args.id];
    },
    users: async (args, context) => {
      // Retrieve all users from the User collection
      const result = await userModel.find();

      return result;
    }
  },
  Mutation: {
    createModel: async (parent, { input }) => {
      try {
        // Create a new model using the input data
        const newModel = new Model({
          model: input.model,
          make: input.make,
          thumbnail: input.thumbnail,
          threads: input.threads
        });

        // Save the new model to the database
        const createdModel = await newModel.save();

        return createdModel;
      } catch (error) {
        console.error("Failed to create model:", error);
        throw new Error("Failed to create model");
      }
    }
  }
};

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  introspection: true
});

async function startServer() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Start the server at the specified port
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 }
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
