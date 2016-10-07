# angualar-expression-input
Creates an input that accepts excel like expressions and shows you the result in realtime.  

Based on Angular v1.5.7.

Includes support for inline variables that can be set in parent controller.
Includes MathService that handles the number rounding and parsing of the expression to an actual result, you can create your own MathService and inject it yourself as long as you name the module "mathService".  Just make sure it exposes a round method and a getResult method.

To include the plugin in your project you can either follow the example I have setup or just add the following to you app initalization:
angular.module("{angular app name}", ["utils.mathService", utils.expression"]);

The directive is setup to expect the expression template (Expression.html) to live in the same directory as the expression.js file.
