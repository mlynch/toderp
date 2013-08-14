angular.module('triple-task', [])

.controller('TaskListCtrl', function ($scope, $timeout) {
  $scope.backlog = [
    { 'text': 'Finish this big thing' }
  ];

  $scope.taskList = [];

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
    $scope.backlog.splice(index, 1);

    var todaysTasks = $scope.getTodaysTasks();
    todaysTasks.tasks.push(task);
  };

  $scope.getTodaysTasks = function() {
    var today = new Date;
    today.setHours(0,0,0,0);

    var firstTask = $scope.taskList.length && $scope.taskList[0];

    if(firstTask && firstTask.date.getTime() == today.getTime()) {
      return firstTask;
    }

    tasks = {
      date: today,
      tasks: []
    }
    $scope.taskList.unshift(tasks);

    return tasks;
  }
  
  $scope.deleteBacklogTask = function(task, index) {
    console.log('Deleting task', task, index);
    $scope.backlog.splice(index, 1);
  };

  $scope.finishTask = function(taskList, task, index) {
    task.complete = true;
  }

  $scope.backlogTask = function(taskList, task, index) {
    taskList.tasks.splice(index, 1);
    $scope.backlog.push(task);
  }
});
