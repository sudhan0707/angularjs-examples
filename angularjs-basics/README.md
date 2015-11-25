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