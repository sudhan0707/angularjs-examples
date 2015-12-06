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

####Creating Services with the Service
The service is similar to ``factory``; However, instead of returning a factory function, it uses a constructor function, which is equivalent to using the new operator.

````javascript

angular
    .module('parkingApp')
      .service('parkingService', function(parkingConfig){
          this.calculator = function( car ){
          var departHour = new Date().getHours();
          var entraceHour = car.entrance.getHours();
          var parkingPeriod = departHour - entranceHour;
          var parkingPrice = parkingPeriod * parkingConfig.parkingRate;

          return {
            period : parkingPeriod,
            price  : parkingPrice
          };
        };
      });
````
  The framework allows us to create services in a more complex and configurable way using the ``Provider`` function.

####Creating services with the Provider

  Providers can be configured before they are injected inside other components. While the factory works by returning an object and the service with the constructor function, the provider releis on the $get function to expose its behavior. This way, everything returned by this function becomes available through the dependency injection.


  ````javascript

  angular
      .module('parkingApp')
          .provider('parkingService', function( parkingConfig){
              
              var _parkingRate = parkingConfig.parkingRate;

              var _calculateTicket = function( car ){
                var departHour = new Date().getHours();
                var entranceHour = car.entrance.getHours();
                var parkingPeriod = departHour - entranceHour;
                var parkingPrice = parkingPeriod * _parkingRate;

                return {
                  period : parkingPeriod,
                  price   : parkingPrice
                };
              };

              this.setParkingRate = function (rate){
                _parkingRate = rate;
              };
              
              this.$get = function (){
                return {
                  calculateTicket : _calculateTicket
                };
              };
            });
````
In the above code, we refactored our service to be implemented by a provider. Inside the $get function, the calculateTicket method is being returned and will be accessible externally.

In order to configure our provider, we need to use the ``config`` function of the module API, injecting the service through its function. In the following code, we are calling the ``setParkingRate`` method of the provider, overwriting the default rate that comes from the ``parkingConfig`` method.

````javascript

//config.js

angular
  .module('parkingApp')
      .config(function (parkingServiceProvider){
        parkingServiceProvider.setParkingRate(10);
      });

````

##Using AngularJS built-in Services
####Promises
A promise is a method that eventually produces a value. It can be considered as the asynchronous counterpart of a getter function. Its essence can be explained as

````javascript
  promise.then(function(value){
    // Do something with the 'value'
})
````
####The deferred API
In order to create a new promise, we need to inject the ``$q`` service into our component and call the ``$q.defer()`` function to instantiate a deferred object. It will be used to implement the asynchronous behavior in a declarative way through its API. Some of the functions are as follows

1. resolve (result) : This resolves the promise with the result.
2. reject (reason)  : This rejects the promise with a reason.
3. notify (value)   : This provides updated information about the progress of the promise. Consider the following code snippet:

````javascript

//services.js

angular
    .module('parkingApp')
      .factory('carSearchService', function($timeout, $q){
          
          var _filter = function( cars, criteria){
              var deferred = $q.defer();
              $timeout(function (){
                var result = [];
                angular.forEach(cars, function (car){
                  if(_matches(car, criteria)){
                     result.push(car);
                  }
                });
                if(result.length > 0){
                    deferred.resolve(result);
                } else{
                      deferred.reject("No results were found!");
                }
              }, 1000);
              return deferred.promise;
          };
        
        var _method = function (car, criteria){
          return angular.toJson(car).indexOf(criteria) > 0;
        };

        return {
          filter: _filter
        }
      
      });
````
The ``$timeout`` service is really useful when we need to execute a specific behavior after a certain amount of time. Also, there is another service called ``$interval``; however, it executes the behavior repeatedly.

With promise object in hand, we can handle the expected behavior of the asynchronous return of any function. There are three methods that we need to understand in order to deal with promises:

1. ``then(successCallback, errorCallback, notifyCallback)``: The success callback is invoked when the promise is resolved. In the same way, error callback is called if the promise is rejected. If we want to keep track of our promise, the notify callback is called every time the promise is notified. Also, this method returns a new promise, allowing us to create a chain of promise.

2. ``catch(errorCallback)``: This promise is just an alternative and is equivalent to ``.then(null, errorCallback)``.

3. ``finally(callback)``: Like in other languages, finally can be used to ensure that all the used resources were released properly:

````javascript
//controllers.js

angular
  .module('parkingApp')
  .controller('parkingCtrl', function($scope, carSearchService){
    
    $scope.cars = [
          {plate : '7E24HO8'},
          {plate : '7E24HO9'},
          {plate : '7E24H10'},
          {plate : '7E24H11'}
        ];

    $scope.filters = function (criteria){
      carSearchService.filter($scope.cars, criteria)
        .then(function ( result ){
            $scope.searchResult = result;
          })
        .catch(function (message){
            $scope.message = message;
          });
    }
});

````

#### Communicating with the backend
Every client side javascript applications needs to communicate with the backend. In general, this communication is performed through an interface, which is exposed by the server side application that relies on the HTTP protocol to transfer data through the JSON.

####HTTP

HTTP Methods for RESTful Services:
Source: http://www.restapitutorial.com/lessons/httpmethods.html


|HTTP Verb|CRUD|Entire Collection (e.g. /customers)|Specific Item (e.g. /customers/{id})|
|----------|----|------------|------------|
|POST| Create | 201 (Created), Location header with link to /customers/{id} containing new ID| 404 (Not Found), 409 (Conflict) if resource already exists..|
|GET| Read | 200 (OK), list of customers. Use pagination, sorting and filtering to navigate big lists. |200 (OK), single customer. 404 (Not Found), if ID not found or invalid.|
|PUT |Update|  404 (Not Found), unless you want to update/replace every resource in the entire collection.| 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.|
|DELETE|  Delete|  404 (Not Found), unless you want to delete the whole collection—not often desirable. | 200 (OK). 404 (Not Found), if ID not found or invalid.|

The following are some examples of this concept:

````
GET /cars
GET /cars/1
````
``GET /cars`` retrieves list of cars. ``GET /cars/1`` retrieve information about a specific car.

In order to create a new car, we should use the same resource, cars, but this time, with the POST method.

````
POST /cars
````
The car information will be transmitted within the request body.

To change any entity that already exists, we can rely on the PUT method, using the same concepts used by the POST method

````
PUT /cars/1
````
Finally, the DELETE method is responsible for deleting the existing entities.
````
DELETE /cars/1
````

####HTTP Protocols

1. 200 OK
2. 400 Bad Request
3. 401 Unauthorized
4. 403 Forbidden
5. 404 Not Found
6. 500 Internal Server Error

In case of an error, the response must bring the associated message, explaining what's happening and allowing  the developers to handle it.

####$http Service

The ``$http`` service wraps the low level  interaction with the ``XMLHttpRequest`` object, providing an easy way to perform calls.

This service could be called by just passing a configuration object, used to set a lot of important information such as the method, the URL of the requested resource, the data to be sent, and many more.

````javascript
$http({method: "GET", url: "/resource"});
````
It also returns a promise. We can attach the success and error behavior to this promise

````javascript

$http({ method: "GET" , url : "/resource"})
  .success(function (data, status, headers, config, statusText){
  // success functionality goes here...
  })
  .error(function (data, status, headers, config, statusText){
  // failure functionality goes here...
  })

````
To make it easier to use, the following shortcut methods are available for this service. In this case, the configuration object is optional:

````
$http.get(url, [config])
$http.post(url, data, [config])
$http.put(url, data, [config])
$http.head(url, [config])
$http.delete(url, [config])
$htto.jsonp(url, [config])
````

##Scope
####Two-way data binding
Traditional web applications are commonly developed through a one-way data binding mechanism. This means there is only a rendering step that attaches the data to the view. This is done with the following code snippet in the index.html file:


````html
//index.html
<input id='plate' type='text'/>
<button id ='showPlate'>Show Plate</button>

//render.js
var plate = 'AAA9999';
$('#plate').val(plate);
$('#showPlate').click(function(){
  alert(plate);
});
````

what happens when we change the plate and click on the button? 

Unfortunately, nothing..

In order to reflect the changes on the plate, we need to implement the binding in the other direction,

````javascript

//render.js
var plate = 'AAA9999';
$('#plate').val(plate);
$('#showPlate').click(function(){
  
  plate = $('#plate').val();
  
  alert(plate);
});
````
Every change that occurs in the view needs to be explicitly applied to the model, and this requires a lot of boilerplate code, which means snippets of code that have to be included in many places just to keep everything synchronized. 

````javascript

//render.js
var plate = 'AAA9999';

$('#plate').val(plate);

$('#plate').val(plate);
$('#showPlate').click(function(){
  plate = $('#plate').val();
  alert(plate);
});
````

####$apply and $watch
During the framework initialization, the compiler($compile) walks through the DOM tree looking for directives. When it finds the ngModel directive attached to any kind of input field, it binds its own scope's $apply function to the ``onkeydown`` event. This function is responsible for invoking the notification process of the framework called the ``digest cycle``

This cycle is reponsible for the notification process by looping over all the watchers, keeping them posted about any change that may occur in the scope. There are situations where we might need to invoke this mechanism manually by calling the ``$apply`` function directly, as follows:

````javascript
$scope.$apply(function(){
  $scope.car.plate = '8AA5678';
})
````
On the other side, the components responsible for displaying the content of any element present inside the scope use their scope's ``$watch`` function to be notified about the changes on it. This function observes whether the value of a provided scope property has changed. To illustrate the basic usage of the $watch function,

let's create a counter to track the number of times the value of a scope property has changed. Consider the following code snippet in the parking.html file:

````html

//index.html
<input type="text" ng-model="car.plate" placeholder="what's the plate?" />    
<span>{{plateCounter}}</span>

//controllers.js
var parking =  angular.module('parkingApp');

  parking.controller('parkingCtrl', function($scope){
    $scope.plateCounter = -1;
    
    $scope.$watch('car.plate', function(){
      $scope.plateCounter++;
    });
  });
````
Now, everytime the plate property changes, this watcher will increment the plateCounter property, indicating the number of times it has changed. You may wonder why we are using -1 instead of 0 to initialize the counter, when the value starts with 0 in the view. This is because the digest cycle is called during the intialization process and updates the counter to 0.

#####Best practices using the scope

1. The scope is not the model itself - it's just a way to reach it. Thus, the view and controller layer are absolutely free to share any kind of information, even those that are not related to the model, and they only exist to fulfill specific layout matters such as showing or hiding a field under a determined condition.

Be careful about falling into a design trap! The freedom provided by the scope can lead you to use it in a wrong way. Keep the following advice in mind:

````
"Treat scope as read-only inside the view and write only inside the controller as possible."
````
2. Avoid making changes to the scope directly from the view
This means that though it is easy, we should avoid making changes to the scope by creating or modifying its properties directly inside the view. At the same time, we need to take care about reading the scope directly everywhere inside the controller.

````html
//faq.html
<button ng-click='faq = true'> Open </button>
<div ng-modal="faq">
  <div class="header">
    <h4>FAQ</h4>
  </div>
  <div class="body">
    <p>You are in the Frequently Asked Questions!</p>
  </div>
  <div class="footer">
    <button ng-click="faq = false">Close</button>
  </div>
</div>
````
In the previous example, we changed the value of the dialog property directly from the ngClick directive declaration. The best choice in this case would be to delegate this intention to the controller and let it control the state of the dialog, such as the following code in the faq.html file:

````html
<button ng-click="openFAQ()">Open</button>
  <div ng-modal="faq">
    <div class="header">
      <h4>FAQ</h4>
 </div>
  <div class="body">
   <p>You are in the Frequently Asked Questions!</p> 
  </div>
  <div class="footer">
    <button ng-click="closeFAQ()">Close</button>
  </div>
</div>

//controller.js
parking.controller('faqCtrl', function($scope){
  $scope.faq = false;

  $scope.openFAQ = function (){
    $scope.faq = true;
  }

  $scope.closeFAQ = function (){
    $scope.faq = false;
  }
})
````

The idea to spread a variable across the whole view is definitely dangerous. It contributes to reducing the flexibility of the code and also increases the coupling between the view and the controller.

3. Avoid reading the scope inside the controller
Reading the $scope object inside the controller instead of passing data through parameters should be avoided. This increases the couple between them and makes the controller much harder to test. 
