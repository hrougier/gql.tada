/** @type {import('graphql-config').IGraphQLConfig} */
module.exports = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["src/**/*.{ts,tsx}"],
  extensions: {
    endpoints: {
      default: {
        url: "https://rickandmortyapi.com/graphql",
      },
    },
  },
};
