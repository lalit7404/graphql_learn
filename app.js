var createError = require('http-errors');
var express = require('express');
var graphqlHttp = require('express-graphql');
const graphQlSchema=require('./graphql/schema/index')
const graphQlResolevers=require('./graphql/resolvers/index')
const isAuth=require('./graphql/middleware/is-auth')
//var schema = require('./graphql/');
/*var {
    buildSchema,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');*/

var path = require('path');
const Mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


Mongoose.connect("mongodb://localhost/graphqlTest")
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(isAuth)
app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue:graphQlResolevers,
    graphiql: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
