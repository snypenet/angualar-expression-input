(function () {
    var Expression = function (mathService, $timeout) {
        return {
            restrict: "AE",
            require: 'ngModel',
            scope: {
                value: '=ngModel',
                variables: '=variables'
            },
            templateUrl: "Expression.html",
            link: function (scope, element, attributes, ngModelController) {
                var inputElement = element.find("input");
                for (var a in attributes.$attr) {
                    if (attributes.$attr[a] != "ng-model" && attributes.$attr[a] != "variables") {
                        inputElement.attr(attributes.$attr[a], attributes[a]);
                    }
                }
                 
                setVariables();

                function setVariables(){
                    try{                
                        if(!scope.variables || !scope.variables.length){                            
                            scope.variables = [];
                        }
                    }catch(e){
                        scope.variables = [];
                    }
                }

                scope.expression = "";
                
                var clearValueWatch = scope.$watch("value", function(newValue, oldValue, scope){
                    if(scope.value && !scope.expression){
                        if(!isNaN(scope.value)) {
                            scope.value = mathService.round(scope.value, 2);  
                        }    
                        scope.expression = scope.value.toString();
                        scope.evaluate();
                        ngModelController.$setViewValue(scope.value);
                        clearValueWatch();
                    }
                });

                function getExpression(){
                    var expression = scope.expression.replace(/=/g, "").toLowerCase();
                    if(scope.variables && scope.variables.length){
                        for(var v in scope.variables){
                            expression = expression.replace(new RegExp(scope.variables[v].name.toLowerCase(),"g"), scope.variables[v].value);
                        }
                    }
                    return expression;
                }
                
                scope.insertVariable = function(variableName){
                    if(currentCursorPosition == -1 || currentCursorPosition == 0){
                        if(scope.expression != ""){
                            scope.expression = scope.expression + " " + variableName;
                        }else{                            
                            scope.expression = "=" + variableName;
                        }
                    }else{
                        var firstHalf = scope.expression.substring(0, currentCursorPosition);
                        var secondHalf = scope.expression.substring(currentCursorPosition);
                        scope.expression = firstHalf + variableName + secondHalf;
                    }
                    
                    scope.evaluate();
                }
                
                var currentCursorPosition = -1;
                scope.getCursorPosition = function($event){
                    setCursorPosition($event.target);
                }
                
                function setCursorPosition(target){// Initialize
                    currentCursorPosition = scope.expression.length - 1;
                    // IE Support
                    if (document.selection) {
                        // Set focus on the element
                        target.focus ();

                        // To get cursor position, get empty selection range
                        var targetRange = document.selection.createRange ();

                        // Move selection start to 0 position
                        targetRange.moveStart ('character', -target.value.length);

                        // The caret position is selection length
                        currentCursorPosition = targetRange.text.length;
                    } else if (target.selectionStart || target.selectionStart == '0'){
                        currentCursorPosition = target.selectionStart;
                    }
                }
                				
				scope.$on(attributes.name + ".expression.clearValue", function(newValue, oldValue){
					scope.value = "";
					scope.expression = "";
                    ngModelController.$setViewValue("");
				});				

                scope.evaluate = function () {
                    clearValueWatch();
                    if (scope.expression && scope.expression.substring(0, 1) == "=") {
                        scope.value = mathService.round(mathService.getResult(getExpression()), 2);
                    } else if (scope.expression && !isNaN(scope.expression)) {
                        scope.value = mathService.round(Number(scope.expression), 2);
                    } else {
                        scope.value = null;
                    }

                    ngModelController.$setViewValue(scope.value);
                }
                scope.shouldShowValue = function(){
                    return scope.expression && scope.expression.substring(0, 1) == "=";
                }
            }
        }
    }

    angular.module("utils.expression", []).directive("expression", ["mathService", "$timeout", Expression]);
})()