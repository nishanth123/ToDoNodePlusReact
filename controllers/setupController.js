var Todos = require('../models/todoModel');

module.exports = function(app) {

  // seed database
  app.get('/api/setupTodos', function(req, res) {
    var startedTodos = [
      {
        username: 'nishanth2',
        todo: 'Buy mouse',
        isDone: false,
        hasAttachment: false
      },
      {
        username: 'bnishanth403',
        todo: 'Sell laptop',
        isDone: true,
        hasAttachment: false
      }
    ];
    Todos.create(startedTodos, function(err, 
      results) {
        res.send(results);
      });
  }); 
}