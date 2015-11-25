##AngularJS

###Introduction to AngularJS
1.Created by Misko Hevery and Adam Abrons in 2009. 

####Creating Reusable Components with Directives
Directives is the most important feature in AngularJS.

###What is a directive?
1. A directive is an extension of the HTML attributes that allows us to create new behaviors. 
2. This technology lets the developers create reusable components that can be used within the whole application and even provide their own custom components.

The directive can be applied as an attribute, element, class and even as a comment using the camelCase syntax.

####Some Directives

#####The ngApp Directive
The ngApp directive defines the root of an AngularJS application. 
1. This directive is used to bootstrap the framework.
2. This generally on HTML or body tag.
3. Takes module name as a parameter.
4. Defines the entry point of the application in which other components such as Controllers, services, filters and directives can be boun`
#####The ngController directive
Any Controller can be attached to the view using the ngController directive. After using this directive, the view and controller start to share the same scope and are ready to work together.

######Nested Controllers
Sometimes, our controller can become too complex, and it might be interesting to split the behavior into separated controllers. This can be achieved by creating nested controllers.

```
<body ng-controller='parkingCtrl'>
	<div ng-controller='parkingNestedCtrl'>
	</div>
</body>
```

#####The ngRepeat directive
1. The ngRepeat directive is really useful to iterate over arrays and objects.
2. This directive can be used with any kind of element such as the rows of a table, the elements of a list, and even the options of select.
3. The directive takes a special repeat expression that describes the array to iterate over the variable that will hold each item in the iteration. The most basic expression format allows us to iterate over an array, attributing each element to a variable.

```car in cars```

4. Also, this directive can be used to iterate over objects.
```(key, value) in object```

5. Beyond iterating, we might need to identity which is the first or the last element, what is its index number and many other things. This can be achieved by using the following properties:

| variable	| Type	| Details	|
|-----------|-------|-----------|
|$index		|number	|Number of the elements	|
|$first		|Boolean|This is true if the element is the first one|
|$last		|Boolean|This is true if the element is the last one|
|$middle	|Boolean|This is true if the element is in the middle|
|$even	|Boolean	|This is true if the element is even|
|$odd	|Boolean 	|This is true if the element is odd|

#####The ngModel directive
1. The ngModel directive attaches the element to a property in the scope, thus binding the view to the model.
2. Warning note: We must pay attention to the purpose of the field that is using the ngModel directive. Every time the field is a part of the construction of an object, we must declare the object in which the property should be attached.
 We will be talking more about "Two-way data binding" in coming classes and hence it is very important to understand how the ngModel directive works behind the scenes. Stay tuned!!

#####The ngClick directive and the other event directives.
The ngClick directive is one of the most useful kinds of directives in the framework. It allows you to bind any custom behavior to the click event of the element. The following code is an example of the usage of the ngClick directive calling a function.

```
<div ng-app="myApp" ng-controller="myCtrl">

<button ng-click="count = count + 1">Click me!</button>

<p>{{ count }}</p>

</div>
<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.count = 0;
});
</script>
```
#####Angular Expressions
A expression is a simple piece of code that will be evaluated by the framework and can be written between double curly brackets. {{object.property}}.

This way writing expression is known as interpolation  and allows you to easily interact with anything from the scope.

Besides exhibiting/displaying the available objects in the scope, the expressions also give us the ability to perform some calculations such as {{2+2}}. 

The expressions also forgives the undefined and null values, without displaying any error; instead it doesn't show anything.

Sometimes, it might be necessary to transform the value of a given expression in order to exhibit the properly, however, without changing the underlying data. We will learn how expression are well suited for this purpose.

Read more: https://docs.angularjs.org/guide/expression

Read, Read, Read and More directives.
1. ngBind 
2. ngBindHtml
3. ngDisable
4. ngClass
5. ngOptions
6. ngStyle
7. ngShow vs ngHide
8. ngIf
9. ngInclude

Source to read: https://docs.angularjs.org/api


