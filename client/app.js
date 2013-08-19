angular.module('toderp', ['firebase'])

.controller('LoginCtrl', ['$scope', 'angularFire', function($scope, angularFire) {

}])

.controller('TaskListCtrl', ['$scope', '$q', 'angularFire', function ($scope, $q, angularFire) {
  // We are loading
  $scope.loading = true;

  var dbUrl = 'https://triple-task.firebaseio.com/triple';

  var backlogPromise = angularFire(dbUrl, $scope, 'backlog');
  var taskListPromise = angularFire(dbUrl, $scope, 'taskList');

  $q.all([backlogPromise, taskListPromise]).then(function() {
  
  // Done loading
  $scope.loading = false;

  //$scope.backlog = []
  //$scope.taskList = [];
  /*
    { 'text': 'Finish this big thing' }
  ];
  */


  /**
   * Process new task submit
   */
  $scope.addTaskFormSubmit = function() {
    $scope.addTask($scope.taskDraft);
    $scope.taskDraft = '';
  };

  /**
   * Add a new task to the task backlog
   */
  $scope.addTask = function(text) {
    $scope.backlog.push({
      text: text
    });
  };

  /**
   * Put a task into todays task list.
   */
  $scope.enqueueTask = function(task, index) {
    console.log('Enqueuing task', task, index);
    $scope.backlog.splice(index, 1);

    var todaysTasks = $scope.getOrCreateTodaysTasks();
    todaysTasks.tasks.push(task);
  };

  /**
   * Grab the tasks for today, or create a new set.
   */
  $scope.getOrCreateTodaysTasks = function() {
    var today = new Date;
    today.setHours(0,0,0,0);

    var firstTask = $scope.taskList.length && $scope.taskList[0];

    if(firstTask && firstTask.date && firstTask.date == today.getTime()) {
      return firstTask;
    }

    tasks = {
      date: today.getTime(),
      tasks: []
    }
    $scope.taskList.unshift(tasks);

    return tasks;
  }
  
  /**
   * Delete a task from the backlog.
   */
  $scope.deleteBacklogTask = function(task, index) {
    console.log('Deleting task', task, index);
    $scope.backlog.splice(index, 1);
  };

  /**
   * Reset a task to its clean state (i.e. not completed, etc.)
   */
  $scope.resetTask = function(task) {
    task.complete = false;
  }

  /**
   * Mark a given task as completed.
   */
  $scope.finishTask = function(taskList, task, index) {
    task.complete = true;
  }

  /**
   * Send a task to the task backlog
   */
  $scope.backlogTask = function(taskList, task, index) {
    taskList.tasks.splice(index, 1);
    $scope.backlog.push(task);
  }
  });
}]);
