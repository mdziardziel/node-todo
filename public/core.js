var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};

  $scope.cos = "";
  $scope.doneFilter = ""


  $scope.getTodos = function() {
    $http({url: "/api/todos", method: 'GET', params: { done: $scope.doneFilter }})
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };
  // when landing on the page, get all todos and show them

  $scope.getTodos()

  $scope.getAllTodos = function() {
    $scope.doneFilter = ""
    $scope.cos = null
    $scope.getTodos()
  };

  $scope.getDoneTodos = function() {
    $scope.doneFilter = "true"
    $scope.cos = 'done'
    $scope.getTodos()
  };

  $scope.getNotDoneTodos = function() {
    $scope.doneFilter = "false"
    $scope.cos = 'not done'
    $scope.getTodos()
  };

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("/api/todos", $scope.formData)
      .success(function(data) {
        $("input").val("");
        // $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
      $scope.formData.text = null
    $scope.getTodos()
  };

  // update a todo after checking it
  $scope.updateTodo = function(todo) {
    $http
      .put("/api/todos/" + todo._id, { done: todo.done })
      .success(function(data) {
        $("input").val("");
        // $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
    $scope.getTodos()
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("/api/todos/" + id)
      .success(function(data) {
        // $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
      $scope.getTodos()

  };
}
