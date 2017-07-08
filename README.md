Notes:

All callbacks in Mongoose use the pattern callback(error, result). If an error occurs executing the query, the error parameter will contain an error document, and result will be null. If the query is successful, the error parameter will be null, and the result will be populated with the results of the query

var Athlete = mongoose.model('Athlete', yourSchema);

// find all athletes who play tennis, selecting the 'name' and 'age' fields
Athlete.find({ 'sport': 'Tennis' }, 'name age', function (err, athletes) {
  if (err) return handleError(err);
  // 'athletes' contains the list of athletes that match the criteria.
})

If you don't specify a callback then the API will return a variable of type Query. You can use this query object to build up your query and then execute it (with a callback) later using the exec() method.


Router functions are Express middleware, which means that they must either complete (respond to) the request or call the next function in the chain. In the case above we complete the request, so the next argument is not actually used.

Route paths can also be string patterns. String patterns use a subset of regular expression syntax to define patterns of endpoints that will be matched. The subset is listed below (note that the hyphen (-) and the dot (.) are interpreted literally by string-based paths):

  ? : The endpoint must have 0 or more of the preceding character. E.g. a route path of '/ab?cd' will match endpoints acd , abcd, abbcd etc.
  + : The endpoint must have 1 or more of the preceding character. E.g. a route path of '/ab+cd' will match endpoints abcd, abbcd, abbbcd, and so on.
  * : The endpoint may have an arbitrary string where the * character is placed. E.g. a route path of 'ab*cd' will match endpoints abcd, abXcd, abSOMErandomTEXTcd, and so on.
  () : Grouping match on a set of characters to perform another operation on. E.g. '/ab(cd)?e' will peform a ? match on (cd) —it will match abe, abcde, abcdcde, and so on.

The route paths can also be JavaScript regular expressions.

Route parameters are named URL segments used to capture the values specified at their position in the URL. The named segments are prefixed with a colon and then the name (e.g. /:your_parameter_name/. The captured values are stored in the req.params object using the parameter names as keys (e.g. req.params.your_parameter_name).

app.get('/users/:userId/books/:bookId', function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  res.send(req.params)
})



Most of the methods we use in Express are asynchronous—you specify an operation to perform, passing a callback. The method returns immediately, and the callback is invoked when the requested operation completes. By convention in Express, callback functions pass an error value as the first parameter (or null on success) and the results from the function (if there are any) as the second parameter.

However what if you need to make multiple asynchronous queries, and you can't render the page until all the operations have completed? A naive implementation could "daisy chain" the requests, kicking off subsequent requests in the callback of a previous request, and rendering the response in the final callback. The problem with this approach is that our requests would have to be run in series, even though it might be more efficient to run them in parallel. This could also result in complicated nested code, commonly referred to as callback hell.

A much better solution would be to execute all the requests in parallel and then have a single callback that executes when all of the queries have completed. This is the sort of flow operation that the Async module makes easy!

The method async.parallel() is used to run multiple asynchronous operations in parallel.

The first argument to async.parallel() is a collection of the asynchronous functions to run (an array, object or other iterable). Each function is passed a callback(err, result) which it must call on completion with an error err (which can be null) and an optional results value

The example below shows how this works when we pass an object as the first argument. As you can see, the results are returned in an object with the same property names as the original functions that were passed in.

async.parallel({
  one: function(callback) { ... },
  two: function(callback) { ... },
  ...
  something_else: function(callback) { ... }
  },
  // optional callback
  function(err, results) {
    // 'results' is now equal to: {one: 1, two: 2, ..., something_else: some_value}
  }
);

If you instead pass an array of functions as the first argument, the results will be an array (the array order results will match the original order that the functions were declared—not the order in which they completed)

The method async.series() is used to run multiple asynchronous operations in sequence, when subsequent functions do not depend on the output of earlier functions. It is essentially declared and behaves in the same way as async.parallel().

Note: The ECMAScript (JavaScript) language specification states that the order of enumeration of an object is undefined, so it is possible that the functions will not be called in the same order as you specify them on all platforms. If the order really is important, then you should pass an array instead of an object.

The method async.waterfall() is used to run multiple asynchronous operations in sequence when each operation is dependent on the result of the previous operation.

The callback invoked by each asynchronous function contains null for the first argument and results in subsequent arguments. Each function in the series takes the results arguments of the previous callback as the first parameters, and then a callback function. When all operations are complete, a final callback is invoked with the result of the last operation. The way this works is more clear when you consider the code fragment below (this example is from the async documentation):

The example template file below shows off many of Pug's most useful features.

doctype html
html(lang="en")
  head
    title= title
    script(type='text/javascript').
  body
    h1= title

    p This is a line with #[em some emphasis] and #[strong strong text] markup.
    p This line has un-escaped data: !{'<em> is emphasised</em>'} and escaped data: #{'<em> is not emphasised</em>'}.
      | This line follows on.
    p= 'Evaluated and <em>escaped expression</em>:' + title

    <!-- You can add HTML comments directly -->
    // You can add single line JavaScript comments and they are generated to HTML comments
    //- Introducing a single line JavaScript comment with "//-" ensures the comment isn't rendered to HTML

    p A line with a link
      a(href='/catalog/authors') Some link text
      |  and some extra text.

    #container.col
      if title
        p A variable named "title" exists.
      else
        p A variable named "title" does not exist.
      p.
        Pug is a terse and simple template language with a
        strong focus on performance and powerful features.

    h2 Generate a list

    ul
      each val in [1, 2, 3, 4, 5]
        li= val

If a tag is followed by the equals sign, the following text is treated as a JavaScript expression.

Within the plain text you can insert escaped and unescaped data using the #{} and !{} syntax

You can use the pipe ('|') character at the beginning of a line to indicate "plain text". For example, the additional text shown below will be displayed on the same line as the preceding anchor, but will not be linked.

a(href='http://someurl/') Link text
| Plain text

You can also perform loop/iteration operations using each-in or while syntax. In the code fragment below we've looped through an array to display a list of variables (note the use of the 'li=' to evaluate the "val" as a variable below. The value you iterate across can also be passed into the template as a variable!

ul
  each val in [1, 2, 3, 4, 5]
    li= val
