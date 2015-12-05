###Filters
1. Filters allow us to easily manipulate and transform any value.
2. Filters are really useful when we need to format dates and currency according to our current locale, or even when we need to support the filtering feature of a grid component. They are the perfect solution to easily perform any data manipulation.
3. Usage format e.g:
```
{{expression | filter}}
```
4. Filters can also combined, thus creating a chain where the output of filter1 is the input of filter2.
```
{{expression | filter1 | filter2 }}
```
#####Currency filter
The currency filter is used to format a number based on a currency. The basic usage of this filter is  without any parameter.
```
{{ 10 | currency}}
```
The result of the evaluation will be the number $10.00, formatted and prefixed with the dollar sign. 
```
{{ 10 | currency : 'Euro'}}
```
#####Date filter
The ``date`` filter is one of the most useful filters of the framework. Generally, a date value comes from the database or any other source in a raw and generic format. Date filter comes handy to transform raw or generic data into desired format.
```
{{car.entrance | date:'MMMM dd/MM/yyyy HH:mm:ss'}}
```
Output: December 11/24/2015 07:28:00.

####Read, Read, Read....
1. limitTo    e.g: {{ expression | limitTo: 10 }}
2. lowercase  e.g: {{ expression | lowercase }}
3. uppercase  e.g: {{ expression | uppercase }}
4. number     e.g: {{ expression | number:2 }}

#####orderBy
This expression is used to determine the order of the elements and works in three different ways:
######1. String
This is the property name. Also, there id an option to prefix + or - to indicate the order direction. 
######2. Array
Based on the same concept of String's predicate expression, more than one property can be added inside the array. Therefore, if two elements are considered equivalent by the first predicate, the next one can be used, and so on.
######3. Function
This function receives each element of the array as a parameter and returns a number that will be used to compare the elements against each other.

```
 {{ expression | orderBy:predicate:reverse }}
```


Example:

```html
<script>
  angular.module('orderByExample', [])
    .controller('ExampleController', function($scope) {
      $scope.friends =
          [{name:'John', phone:'555-1212', age:10},
           {name:'Mary', phone:'555-9876', age:19},
           {name:'Mike', phone:'555-4321', age:21},
           {name:'Adam', phone:'555-5678', age:35},
           {name:'Julie', phone:'555-8765', age:29}];
    });
</script>
<div ng-controller="ExampleController">
  <table class="friend">
    <tr>
      <th>Name</th>
      <th>Phone Number</th>
      <th>Age</th>
    </tr>
    <tr ng-repeat="friend in friends | orderBy:'-age'">
      <td>{{friend.name}}</td>
      <td>{{friend.phone}}</td>
      <td>{{friend.age}}</td>
    </tr>
  </table>
</div>
```
Output:

|Name	|Phone Number	|Age|
|-------|---------------|---|
|Adam	|555-5678	|35|
|Julie	|555-8765	|29|
|Mike	|555-4321	|21|
|Mary	|555-9876	|19|
|John	\555-1212	|10|

##Five Basic Principles of Object Oriented Software Design
1. Single Responsibility Principle
This principle states that a class should have only a single responsibility.
2. Open/Close Principle
This principle states that software entities should be open for extension, but closed for modification.
3. Liskov substitution principle
This principle states that objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.
4. Interface segregation principle
This principle states that many client-specific interfaces are better than one general-purpose interface.
5. Dependency inversion principle
This principle states that one should depend upon abstractions. Do not depend upon concretions. Dependency injection is one method following this principle.

##The magic
1. Angular does some neat things for us. It saves us from having to write a bunch of boilerplate code.

#### Application flow

![Dependency Injection](https://docs.angularjs.org/img/guide/concepts-startup.png)

1. Browser loads the HTML and parses it into a DOM, the angular.js script file gets loaded.
2. Angular waits for the browser to fire the DOMContentLoaded event. In the Angular.js file, towards the end, after the entire code has been parsed by the browser, you will find the following code:
```javascript
  jqLite(document).ready(function(){
    angularInit(document, bootstrap);
});
```

3. The preceding code calls the function that looks for the ng-app directive that you can use to bootstrap your Angular application.
The ng-app directive tells the ``$injector`` service to load defined modules.

```html
//index.html
<html ng-ap="tempApp">
  <head>
    //......
  </head>
</html>

//app.js
angular.modular('tempApp',['serviceModule'])
//..
```

4. The $injector service will create ``$rootScope``. As the name suggests, ``$rootScope`` is the parent of all Angular scopes. This $rootScope is linked to DOM itself as a parent to all other Angular scopes.
5. The $injector service will also create ``$compile`` service that will traverse the DOM and looks for other directives (built-in and custom).

####Dependency Injection
In order to create testable and well-designed application, we need to take care about the way their components are related to each other. This relationship, is known as ``Coupling`` and this indicates the level of dependency between the components.

1. The operator ``new`` inside a component increases the level of dependency. Higher dependency leads to lesser scalability. It reduces the chances of replacing the dependency, making it difficult for us to test it.
2. AngularJS is powered by a dependency injection mechanism that manages the life cycle of each component. This mechanism is responsible for creating and distributing the components within the application.
3. The easiest way to obtain a dependency inside a component is by just declaring it as a parameter. The framework's dependency injection mechanism ensures that it will be injected properly.

```javascript
//controllers.js

parking.controller('parkingCtrl', function( $scope, $filter){
  $scope.appTitle = $filter("uppercase") ("Intersource Parking");
});
```
4. The dependencies can also be injected in the same way inside directives, filters and services. Later in classes, Unit Testing, we are going to learn other strategies in order to inject dependencies for testing purposes.


#### Creating Services
A service is a singleton object that has its lifecyle controlled by the framework. It can be used by any other components such as controllers, directives, filters and even other services.

#####Creating Services with the factory
The framework allows the creation of a service component in different ways. The most usual way is to create it using a factory.

1. A factory function is a pattern used to create objects. It is a simple function that returns a new object. However, it brings more concepts such as the ``Revealing Module pattern``.

To understand this pattern,

```javascript
var car = {
  plate: "7EC8930",
  color: "Blue",
  entrance: "2015-12-12-09T23:46:15:185Z"
};
```

The javascript language does not provide any kind of visibility modifier; therefore, there is no way to encapsulate any property of this object, making it possible to access everything directly.

```
> console.log(car.plate)
7EC8930
> console.log(car.color)
Blue
> console.log(car.entrance)
2015-12-12-09T23:46:15:185Z
```

In order to promote encapsulation, we need to use a function instead of an object literal.

```javascript
var car = function(){
  var plate = "7EC8930";
  var color = "Blue";
  var entrance = "2015-12-12-09T23:46:15:185Z";
}
```
Now, it's no longer possible to access any property of the object:
```
> console.log(car.plate)
undefined
> console.log(car.color)
undefined
```
This pattern, beyond taking care of the namespace, provides encapsulation. It allows the implementation of public and private methods, reducing the coupling within the components. It returns an object literal from the function, revealing only the desired properties.

```javascript
var car = function (){
  var plate = "7EC8930";
  var color = "Blue";
  var entrance = "2015-12-12-09T23:46:15:185Z";
  
  return {
    plate:plate,
    color:color
  };
}
```

Also, we need to invoke function immediately; Otherwise, the variable car will receive the entire function. This is a very common pattern and is called IIFE (Immediately Invoked Function Expression).

```javascript
var car = function (){
  var plate = "7EC8930";
  var color = "Blue";
  var entrance = "2015-12-12-09T23:46:15:185Z";
  
  return {
    plate:plate,
    color:color
  };
}();
```
Beyond that, we can apply another convention by prefixing the private members with ``_``, making the code much easier to understand.

```javascript
var car = function (){
  var _plate = "7EC8930";
  var _color = "Blue";
  var _entrance = "2015-12-12-09T23:46:15:185Z";
  
  return {
    plate:_plate,
    color:_color
  };
}();
```

#####Angular way to create Service

```javascript
//services.js
angular
    .module('parkingApp')
      .factory('parkingService', function(){
          
          var _calculateTicket = function(car){
              var departHour = new Date().getHours();
              var entranceHour = car.entrance.getHours();
              var parkingPeriod = deparHour - entranceHour;
              var parkingPrice = parkingPeriod * 10;

              return {
                period : parkingPeriod,
                price  : parkingPrice
              };
            };

          return {
            calculateTicket : _calculateTicket
          };
      });
```

In our first service, we started to create some parking biz rules. we have hardcoded parking rate as $10 per hour. HardCoding is bad!!.
To figure out this kind of a situation, we can create constants. 

Constants are used to store configurations that might be required by any application component. We can store any kind of javascript data type such as String, Number, Boolean, array, object, function, null and undefined.

```javascript
//constant.js
parking.constant("parkingConfig", {
  parkingRate: 10
})
```

Next, we will refactor the _calculateTicket method in order to use the settings from the ``parkingConfig`` constant, instead of the hardcoded values. One change in settings will change the property across the application components.
```javascript
angular
    .module('parkingApp')
      .factory('parkingService', function(parkingConfig){
        var _calculateTicket = function(car){
              var departHour = new Date().getHours();
              var entranceHour = car.entrance.getHours();
              var parkingPeriod = deparHour - entranceHour;
              var parkingPrice = parkingPeriod * parkingConfig.parkingRate;

              return {
                period : parkingPeriod,
                price  : parkingPrice
              };
            };

          return {
            calculateTicket : _calculateTicket
          };
      })
```