describe('Triple controllers', function() {
  describe('TaskCtrl', function() {
    var scope = {}, ctrl = new TaskListCtrl(scope);
    expect(scope.tasks.length).toBe(3);
  });
});
