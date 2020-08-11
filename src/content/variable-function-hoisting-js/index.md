---
title: 'Variable and Function Hoisting in JavaScript'
date: '2020-08-10'
---

"Ah, this isn't working! What's wrong with this code! Why JavaScript, whyyyy?!"

Ok maybe we aren't all this dramatic... Well, maybe we are because I know sometimes I feel like I'm hitting my head against the wall when debugging! One concept in JavaScript that was really strange to me at first was variable and function hoisting. When learning JavaScript, I didn't fully understand what that meant, why it could be bad, or how to prevent the issues that can arise from this.

**What is hoisting?**  
In JavaScript, the term hoisting means that it will grab all of your variables and functions, and bring them to the top of the scope, even if that's where they weren't initially declared.

**What exactly does that mean?**  
It means there is huge potential for bugs to be introduced into your code if this is not handled the proper way! And with the use of var and function declarations, this can get confusing fast! So let's start with the 5 topics we will be covering when it comes to hoisting -
- var
- let
- const
- function declarations
- function expressions
- arrow functions

I also want to quickly introduce a few definitions to you that will remain important in the hoisting concepts explained below. 
&nbsp;
1. **declaration:** when a variable has been created, but a value has not yet been set (undefined).
```js
var firstName;
```
2. **initialization:** a variable has been declared and a value has been set.
```js
var firstName = 'John';
```
3. **variable assignment/reassignment:** setting a value to a variable/setting a new value to that same variable without redeclaring
```js
var movieTitle = 'Resident Evil';
movieTitle = 'Toy Story'
```
4. **global scope:** visible to every function or block in your application
5. **function scope:** visible to only the specific function (local scope)  

## Variable Hoisting
---  

### Declaring variables with var

One way to declare a new variable in JavaScript is with the use of var. Let's look at our first issue when using var.

**Example 1:**

```js
console.log(firstName);
var firstName = 'John';
```
In the above example, firstName will log as 'undefined'. This is because the variable declaration is hoisted, but the initialization is not.
JavaScript is interpreting it as the following: 
```js
var firstName;
console.log(firstName); // undefined
firstName = 'John';
```
Now that we have our feet wet, let's move on to some additional examples and explanations.  
  
**Example 2:**

```js
firstName = 'John';
console.log(firstName);
var firstName;
```
The example above will log 'John'. Here we have initialized the variable before declaring it (which 'var' is ok with). This is why JavaScript can get so confusing sometimes! This example will hoist the declaration of firstName to the top of the global scope, then assign it the value of John.
JavaScript is interpreting it as the following: 
```js
var firstName;
firstName = 'John';
console.log(firstName); // John
```

**Example 3:**
```js
console.log(firstName);
var firstName;
firstName = "John";
```
In this example, the variable declaration is hoisted, but remember that the initialization is not. This will log firstName as undefined.
JavaScript is interpreting it as the following: 
```js
var firstName;
console.log(firstName); // undefined
firstName = 'John';
```

Now that we have seen some examples and issues with the use of var and hoisting, I bet you're wondering how we can solve or avoid some of these potential issues. If we still had to use only 'var' to declare variables, the best way would be to always make sure you declare your variables at the top of your scope. Even then, that could still be challenging, especially if you are working on legacy code. Let's take a look at another example and introduce a function into the mix.  
### Global and Function Scope with var
**Example 4:**  
```js
var city = 'San Francisco';
function logCity(){
  console.log('I was raised in ' + city);
  var city = 'Dallas';
  console.log('Now I live in ' + city);
}
logCity();
```
This example shows how 'var' works when it comes to global and function scope. Running the function 'logCity()' will produce the following:  
- "I was raised in undefined"  
- "Now I live in Dallas"

So what's happening here? The function logCity has its own scope. This is a different scope from where city is initially declared as 'San Francisco'. Again, keep in mind that the same rules apply inside of the function - declaration is hoisted, initialization is not. JavaScript is interpreting it as the following: 
```js
var city = 'San Francisco';
function logCity(){
  var city;
  console.log('I was raised in ' + city); // undefined
  city = 'Dallas';
  console.log('Now I live in ' + city); // Dallas
}
logCity();
```
What about San Francisco? Where did that go if it's not in the same scope as the function scope? Looking at the same example above, we can find San Francisco by simply logging the variable 'city' OUTSIDE of the function scope, because this is part of the global scope.
```js
var city = 'San Francisco';
function logCity(){
  console.log('I was raised in ' + city);
  var city = 'Dallas';
  console.log('Now I live in ' + city);
}
logCity();
console.log(city); // San Francisco
```
Now you can see where the issues really start to come in and how this could become tricky to debug. If you don't know all of these rules, or where the variables are declared in a codebase you are working on, it can become challenging. That's where ES6 and the introduction of 'let' and 'const' come to the rescue!

'let' and 'const' are two additional ways to declare variables in JavaScript. The differences are below: 
- let allows variables to be reassigned
- const does not allow reassignment

There are several more differences that can be found between var, let, and const, but for now we will solely focus on hoisting.

### Declaring variables with let

Using let eliminates many of the problems that come with using var. Here is our first example:

**Example 1:**

```js
console.log(lastName);
let lastName = "Anthony";
```

When a variable is used before it is declared, JavaScript will now throw a reference error when using let. This is a huge difference from using var, where we were able to use the variable before we even declared it! Next we will throw a function into the mix.

**Example 2:**

```js
let operatingSystem = 'Windows';
function operatingSystemPreference(){
  console.log('I sometimes like ' + operatingSystem);
  let operatingSystem = 'Mac';
  console.log('But I really prefer ' + operatingSystem);
}
operatingSystemPreference();
```
The example above will return a ReferenceError. Even though we have declared operatingSystem in the global scope, when we run the function, it is now looking within the function scope. We use operatingSystem in the function before we declare and initialize it with 'Mac'. This is not allowed with the use of let. Below we will look at the same example, but we will not run the function.

**Example 3:**
```js
let operatingSystem = 'Windows';
function operatingSystemPreference(){
  console.log('I sometimes like ' + operatingSystem);
  let operatingSystem = 'Mac';
  console.log('But I really prefer ' + operatingSystem);
}
console.log(operatingSystem);
```

In this example, operatingSystem will return the value 'Windows', and this will not throw a ReferenceError. This is because we are logging the global variable. It does not care what is inside the function scope. It is a separate scope and we are not running the function.  

**Example 4:**
```js
let operatingSystem = 'Windows'; // global scope
function operatingSystemPreference(){
  let operatingSystem = 'Mac'; // function scope
  console.log('But I really prefer ' + operatingSystem);
}
operatingSystemPreference(); // this logs the function scoped operatingSystem variable
console.log('I sometimes like ' + operatingSystem); // this logs the global scoped operatingSystem variable
```
The same concept applies again above (notice we have eliminated the console.log inside the function that was causing the ReferenceError):
### Declaring variables with const

Any time you declare a variable with const, you can use the same rules that apply for let. I am not going to go into the major differences between var, let, and const in this post (again, there are several others I have not mentioned), but the one I do want to point out for const is that it cannot be reassigned. I provided examples above where var and let had been reassigned values throughout the hoisting process, but const differs in this way. When it comes to variable hoisting though, just remember that whatever you have done with let, you can do to const as well!


## Function Hoisting
---
Function hoisting works a little different than variable hoisting. We have three main types of functions to take a look at:
1. Function Declarations
2. Function Expressions
3. Arrow Functions

### Function Declarations

Function declarations will hoist both the function name and the function definition to the top of the scope. This means that not only can you use the function before you declare it, but it will operate completely fine! Let's take a look:

**Example 1:**

```js
operatingSystemPreference();
function operatingSystemPreference(){
  let operatingSystem = 'Mac';
  console.log('I really prefer ' + operatingSystem);
}
```

When running the above code, it logs "I really prefer Mac" and no errors are thrown, even though we have called the function before it was declared. This definitely isn't best practice, but outside of defining all of our functions at the beginning of our code, how else can we prevent this from happening? We can use both function expressions and arrow functions.

### Function Expressions

Function expressions are not hoisted, therefore you cannot call a function expression before it has been declared.

**Example 1:**

```js
operatingSystemPreference();
var operatingSystemPreference = function(){
  let operatingSystem = 'Mac';
  console.log('I really prefer ' + operatingSystem);
}
```

The above example shows a function expression declared with the use of var. You can see that even when declared using var, this will throw an error saying that operatingSystemPreference is not a function. It will not return undefined like var does when a variable is hoisted.

### Arrow Functions

Another new ES6 feature is arrow functions. There are several differences when using arrow functions vs function declarations or function expressions, but when it comes to hoisting, arrow functions operate similarly to function expressions.

**Example 1:**
```js
operatingSystemPreference();
var operatingSystemPreference = () => {
let operatingSystem = 'Mac';
  console.log('I really prefer ' + operatingSystem);
}
```

The above example shows the same function from previous examples written as an arrow function. Again, this does not get hoisted like a function declaration does and this example will throw an error, stating that operatingSystemPreference is not a function.

** Note that both the function expression and arrow function were declared using var. Try these examples and declare them with let or const. Look at the difference in the errors you receive! 

Let's recap some main points: 
- **var:** can be used before declared, will return undefined
- **let:** cannot be used before declared, will throw an error
- **const:** cannot be used before declared, will throw an error
- **function declarations:** can be used before declared, hoists the function name and definition (operates normally)
- **function expressions:** cannot be used before declared, throws an error
- **arrow functions:** cannot be used before declared, throws an error

I hope the above explanations and examples has assisted you in understanding variable and function hoisting! See you next time!