

var User = require('./User');
//var {mergeTypes} = require("merge-graphql-schemas");
const mergeGraphqlSchemas = require('merge-graphql-schemas')
const mergeTypes = mergeGraphqlSchemas.mergeTypes

const typeDefs = [User];

//export default mergeTypes(typeDefs, { all: true });
module.exports=mergeTypes(typeDefs,{all:true})