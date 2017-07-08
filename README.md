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
