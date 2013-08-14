angular.module('triple-task', [])

.controller('TaskListCtrl', function ($scope, $timeout) {
  $scope.backlog = [
    { 'text': 'Finish this big thing' }
  ];

  $scope.addTaskFormSubmit = function() {
    $scope.addTask($scope.taskDraft);
    $scope.taskDraft = '';
  };

  $scope.addTask = function(text) {
    $scope.backlog.push({
      text: text
    });
  };

  $scope.enqueueTask = function(task, index) {
    console.log('Enqueuing task', task, index);
  };
  
  $scope.deleteBacklogTask = function(task, index) {
    console.log('Deleting task', task, index);
    $scope.backlog.splice(index, 1);
  };
});
