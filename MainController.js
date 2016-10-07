(function(){
    var MainController = function($scope){
        $scope.amount = "=four";
        $scope.amountVariables = [
        	{name: "four", value: 4},
        	{name: "one", value: 1}
        ];
        $scope.clear = function(){
        	//format is [expression name].expression.clearValue
        	$scope.$broadcast("amount.expression.clearValue");
        }
	}
	
    angular.module("expressionTest").controller("MainController", ["$scope", MainController]);
})();