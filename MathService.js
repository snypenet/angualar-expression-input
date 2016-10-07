(function () {
    var MathService = function ($parse, $filter) {
        return {
            getResult: function (expression) {
                var result = 0;
                if (!expression) return result;

                try{
                    result = Number($parse(expression)());
                    if(isNaN(result)){
                        result = 0;
                    } 
                } catch (e) {
                    result = 0;
                }

                return result;
            },
            round: function(value, percision){
                var parsedValue = Number(value);
                var parsedPrecision = Number(percision);
                return !isNaN(parsedValue) && !isNaN(parsedPrecision) ? Number($filter("number")(parsedValue, parsedPrecision).replace(/,/g, "")) : 0; 
            }
        }
    }

    angular.module("utils.mathService", []).factory("mathService", ["$parse", "$filter", MathService]);
})()