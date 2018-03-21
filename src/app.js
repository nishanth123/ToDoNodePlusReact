import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

var express = require('express');
var app = express();

var mongoose = require('mongoose');
var config = require('./config');

var port = process.env.PORT || 8080;

mongoose.connect(config.getDbConnectionString());  

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

app.use('/assets', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.send(todoString))

app.set('view engine', 'ejs');

app.listen(port, () => console.log('Example app listening on port 3000!'));

