---
title: "Closures: What Why How and Why Nay"
date: "2020-12-05"
---

## What are they?

Closures are essentially functional sugar for imitating classes in object oriented languages. They're _instances of functions_ which can persist some environment values.

![Functional Closure Venn Diagram](https://miro.medium.com/max/620/0*n6pke36dvxSHV7RW.png)

[Wikipedia](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>) defines closures as

> <article>In programming languages, a closure, also lexical closure or function closure, is a technique for implementing lexically scoped name binding in a language with first-class functions.
>
> Operationally, a closure is a record storing a function together with an environment. The environment is a mapping associating each free variable of the function (variables that are used locally, but defined in an enclosing scope) with the value or reference to which the name was bound when the closure was created.</article>

And that's what they are: an instance of a function, a value, whose non-local variables have been bound either to values or to storage locations.

Perhaps we're digressing too much into definitions.

As we noted earlier, these imitate objects of classes in object oriented programming. This means that closures can retain some states, which act as environment variables. This is because they're instances of functions.

Closures are present in any language where functions are treated as [first-class citizens](https://en.wikipedia.org/wiki/First-class_citizen), which means that functions can be treated as arguments (and thus objects).

A closure is _really_ just a function being returned by another function. Let's look at an example:

```py
def func(x):
    def closure(f, y):
        return f(x,y)

    return closure
```

Now any instances of `func` would create and environment variable `x`, which can be used by the `closure` in addition to its own arguments (`y` and `f`).

```py
ref = func(2)
print(
    ref(
        lambda o, t: o + t
        , 3
        )
    ) # 5
```

(Sorry about the ill-formatting)

**Note:** The outer function returns the inner function itself and not its value. This allows for the function to be called from a reference to the outer function (hence returning the value of the closure).

## Why Closures

Let's take a closer look at an example of closures in Javascript.

Let's say we have a function which adds two values and returns the result. Let's also assume that the first value is somehow constant and we only pass it the second argument which gets added to the first.

Typically, we'd set the first value inside the function; so for 5, we'd have

```javascript
function addTo5(second) {
  return 5 + second;
}
```

For adding to 6, we'd have

```javascript
function addTo6(second) {
  return 6 + second;
}
```

And so we see how the function's code is being repeated unnecessarily. If only there was some way of caching the first value. If only we could save it in the environment and use it later. Hmmm.

```javascript
function add(first) {
  function helper(second) {
    return first + second;
  }

  return helper;
}
```

What does this do? It takes the `first` as the environment variable and when we call the inner function with another argument (`second`), `add` calls `helper` and returns the result (`first + second`).

### Usage

```js
let addTo5 = add(5); // first = 5
let addTo10 = add(10); // first = 10

console.log(addTo5(1)); // second = 1
// result: 6
console.log(addTo5(3)); // second = 3
// result: 8

console.log(addTo10(1)); // second = 1
// result: 11
console.log(addTo10(3)); // second = 3
// result: 13
```

Isn't that convenient?

This closure is the same as the following Java class,

```java
class Add {
  private int first;
  public void Add(int first) {
    this.first = first;
  }

  public int add(int second) {
    return this.first + second
  }
}
```

An object of this class would be called as

```java
Add addTo5 = new Add(5);
System.out.println(addTo5(1)); // 6
```

## What's Cool About Them

Pretty much like objects of classes in object oriented programming, closures can be used to save environment values (which would've been members for an object).

Here are some cool features of closures that make them as intersting as objects:

### Encapsulation

They can faciliate [encapsulation](<https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)>) just as well as OOPs.

Encapsulation is essentially data protection wherein some members or values of an object (or function in this case) are protected from being accessed in any scope out of the immediate parents.

In order to get their values outside the object, the class (which defines the object) must have `getters` and conversely for setting their values, there must be `setters`.

While in most object oriented languages, there are [accessibiliy modifiers](<https://en.wikipedia.org/wiki/Access_modifiers#:~:text=Access%20modifiers%20(or%20access%20specifiers,facilitate%20the%20encapsulation%20of%20components)>) which define the whether and how a member can be accessed outside the class, functional languages depend on closures.

Instead of the variable/state (member) itself being accessed, a closure is returned as a getter/setter in order for any external entities to interact with the member (variable/state).

Let's say we had a function which initalizes a counters and is responsible for

- incrementing the counter with every call
- returning the value of the counter

This is how a JavaScript implementation could look like:

```js
const createCounter = () => {
  let count = 0;
  return {
    click: () => (count += 1),
    getCount: () => count,
  };
};
const counter = createCounter();
counter.click(); // count: 1
counter.click(); // count: 2
counter.click(); // count: 3
console.log(counter.getCount()); // 3
```

[Source](https://medium.com/javascript-scene/encapsulation-in-javascript-26be60e325b4)

In this example, the value of `counter` is never accessed outside `createCounter` but instead, a reference to this function (object) is returned an object containing closures for incrementing the `count` value (`click`) and getting the `count` value (`getCount`). The closures only return their values when called.

### Partial Application

_A partial application fixes the value of some of a function’s arguments without fully evaluating the function._ ~ [Peleke Sengstacke](https://www.digitalocean.com/community/tutorials/javascript-functional-programming-explained-partial-application-and-currying)

This is to say that we can fix values in a function by creating a reference (instance) to it and we can call this reference (which calls the parent function with the stored values) later, delaying execution at our convenience. This enables the function calls to use much less arguments than the function originally needed.

Let's say, hypothetically, for the sake of argument, that we need a function that takes three arguments:

- time
- location
- timezone

and returns a relative time using these 3 arguments

```js
function relativeTime(tm, loc, zone) {
  return helper(tm, loc, zone);
}
```

Now let's say that we only deal with 2 timezones: **EST** and **PST**. We could make separate functions for dealing with these, so that we can _fix_ the `timezone` argument. But that would be redudant. More so, what if we add more timezones for function later?

We could keep the `timezone` variable but also create specific instances of `relativeTime` which use fixed values using closures since closures can save environment values.

```javascript
function fixTimeZone(timezone) {
  function relativeTime(
    tm, loc, zone
    ) {
    return helper(tm, loc, zone);
  }

  return relativeTime(
    time, location, timezone
    );
}
```

Now we can create multiple instances of `relativeTime` with fixed values for `timezone`:

```javascript
const relativeEST = fixTimeZone("EST");
const res1 = relativeEST("0700", "NY");

const relativePST = fixTimeZone("PST");
const res2 = relativePST("0400", "WA");
```

We can fix more arguments using closures so that their values are set as environment variables and the final function call is much smaller (partial application).

### Currying

Currying is the process of converting a function with multiple parameters to a function with a single argument.

A `curry`, from [Haskell Curry](https://es.wikipedia.org/wiki/Haskell_Curry) facilitates currying and returns the single argument function.

Unlike a partial, which returns a value, a curry returns a new function (which could potentially be used by a partial :p).

This also uses closures to cache all the other arguments in environment variables and return a function that uses their values in conjunction with a single other argument passed to the curried function.

Depending on how we curry a function, we could decide how arguments could/would be optional and how their values would default to something.

For example if we had the following function to add 3 numbers:

```javascript
const add = (a, b, c) => a + b + c;
```

To curry this, we'd need to cache 2 of the 3 values into the environment and return a closure for the third:

```javascript
function add(a, b) {
  return (c) => a + b + c;
}
```

## When Are They Boo Boos?

- **Memory can't be garbage collected** as long as the closure is active. This is why we should manage our own memory 🚮
- Since closures are present as inner functions, when the outer function is run, the inner functions are also interpreted, leading to **reduced perfomance**
- I could not find any great resources on **polymorphic closures** and it is difficult for me to imagine since the inner functions act anonymous outside the outer functions
