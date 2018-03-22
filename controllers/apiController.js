var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));

  app.get('/api/todos-name/:uname', function(req, res){

    Todos.find({ username: req.params.uname },
    function(err, todos) {
      if (err) throw err;

      res.send(todos);
    });
  });

  app.get('/api/todos/:id', function(req, res){
    Todos.findById({ _id: req.params.id }, function(err, todos) {
      if (err) throw err;
      res.send(todos);
    });

  });

  app.post('/api/todos', function(req, res){

    if (req.body._id){
      Todos.findByIdAndUpdate(req.body._id, {
        todo: req.body.todo, isDone: 
        req.body.isDone, hasAttachment:
        req.body.hasAttachment }, function(err,
        todo) {
          if (err) throw err;

          res.send('Success');
        }); 
       
    }
    else 
    {
      var newTodo = Todos({
        username: req.body.username,
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      });
      newTodo.save(function(err) {
        if (err) throw err;
        res.send('Success');
      });  
    }
  });

  // app.delete('/api/todos', function(req,res) {
  //   Todos.findByIdAndRemove(req.body._id, function(err) {
  //     if (err) throw err;
  //     res.send('Successfully removed');
  //   });
  // });

  app.delete('/api/todos/:id', function(req,res) {
    
    Todos.findByIdAndRemove({ _id: req.params.id }, function(err, todo) {
      if (err) throw err;

      res.send('Success');
    });
    
    // Todos.findByIdAndRemove(req.body._id, function(err) {
    //   if (err) throw err;
    //   res.send('Successfully removed');
    // });
  });
}