//import React from 'react';
//import ReactDOM from 'react-dom';

//var react = require('react');
//var ReactDOM = require('react-dom');

//import IndecisionApp from './components/IndecisionApp';
//import 'normalize.css/normalize.css';
//import './styles/styles.scss';

const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Todo = require('./../models/todoModel.js');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

var setupController = require('./../controllers/setupController')
//const url = 'mongodb://localhost:27017/signatures';
var apiController = require('./../controllers/apiController')
console.log('test-1');

//ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

console.log('test-3');
//var fs = require('fs');
console.log('test-4');

console.log('test-5');
var config = require('./../config');

var port = process.env.PORT || 8080;

mongoose.connect(config.getDbConnectionString());  

setupController(app);
apiController(app);

var todoString = "";

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
  //trying to get collection names
  //mongoose.connection.db.getCollectionInfos( { name: "users" } );

  //mongoose.connection.db.listCollections().toArray(function (err, names) {
    mongoose.connection.db.collection("todos").find({}).toArray(function (err, names) {
      //console.log(names); 
      module.exports.Collection = names;      

      var arrayLength = names.length;
      for (var i = 0; i < arrayLength; i++) {
        todoString = todoString + ", " + names[i]['name'];
      }

  });
})

//app.use('/assets', express.static(__dirname + '/public'));
//app.get('/', (req, res) => res.send(todoString))

app.get('/', function(req, res) {
  res.json('you did it');
});
//==========================//
//====GET ALL TODOS===//
app.get('/api/todos', function(req, res) {
  Todo.find({}).then(eachOne => {
    res.json(eachOne);
    })
  })
//==========================//
//====POST NEW TODO===//
app.post('/api/todos', function(req, res) {
  Todo.create({
    guestTodo: req.body.TodoOfGuest,
    message: req.body.MessageofGuest,
  }).then(todo => {
    res.json(todo)
  });
});

app.set('view engine', 'ejs'); // this is for server-side templating

app.listen(port, () => console.log('Example app listening on port 8080!'));

