
var {makeExecutableSchema} = require('graphql-tools');
var typeDefs = require('./types');
var resolvers = require('./resolvers');


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports= schema;