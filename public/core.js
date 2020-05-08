var nodeTodo = angular.module("nodeTodo", []);


nodeTodo.component("todoList", {
  templateUrl: "list.html",
  bindings: {
    doneFilter: '<',
    forceReload: '<',
    todosNumber: '='
  },
  controller: function ($scope, $http) {
    var self = this
    this.$onInit = function() {
      self.doneFilter = $scope.$ctrl.doneFilter
      self.todosNumber = $scope.$ctrl.todosNumber
    }
    this.$onChanges = function (changes) {
      $scope.getTodos()
    };
  $scope.formData = {};

  $scope.getTodos = function() {
    $http({url: "/api/todos", method: 'GET', params: { done: self.doneFilter }})
      .then(function(resp) {
        $scope.todos = resp.data;
        self.todosNumber.number = $scope.todos.length
        console.log(self.todosNumber.number )

      }, function(data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.checkTodo = function(todo) {
      $http
      .put("/api/todos/" + todo._id, { done: !todo.done })
      .then(function(data) {
        $scope.getTodos()

      }, function(data) {
        console.log("Error: " + data);
      });
  };

  $scope.updateTodo = function(todo) {
    $http
      .put("/api/todos/" + todo._id, { text: todo.text })
      .then(function(data) {
        $scope.getTodos()

      }, function(data) {
        console.log("Error: " + data);
      });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("/api/todos/" + id)
      .then(function(data) {
        $scope.getTodos()
      }, function(data) {
        console.log("Error: " + data);
      });
  };
}});

nodeTodo.controller('mainController', function mainController($scope, $http, $window) {
  this.$onInit = function() {
    $scope.tab = 'new'
  }

  $scope.formData = {};

  $scope.cos = "";
  $scope.todosNumber = { number: 0 }


  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("/api/todos", $scope.formData)
      .then(function(resp) {
        $("input").val("");
        $scope.formData.text = null
        // $scope.todos = data;
      }, function(data) {
        console.log("Error: " + data);
      });
  };

})

