# Tarmac

Tiny and unopinionated AMD MVC JavaScript framework. Available on [NPM][tarmac-npm] and [Bower][bower] under the name `tarmac`.

Built to provide the base functionality required for an MVC application in a minimalistic fashion; it assists with tasks such as routing and storage, but needs you to implement the end result. This means it can be used on any JavaScript platform.

If you want to run it in a browser you can hook the router in the hash change event and storage into localStorage. Or maybe you want your storage to fire off to the server to keep things a little safer. It's all up to you.

Views and rendering should be implemented how you think is best for your specific application. Chose a templating library that matches your need at the time for example.

You can checkout [my implementation of TodoMVC][tarmac-todomvc] to see how I intended it to be used. It makes a good reference application.

## Status

This framework is still in development at the moment. You can play with it if you want, the tests will all be passing. Things will just change rapidly and without warning. Use at your own risk!

## Tests

You can run the tests by starting the server (`./scripts/server.sh`) and navigating to [http://localhost:8000/tests/][tests].

## License (MIT)

Copyright (c) 2013 Oliver Caldwell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[tarmac-npm]: https://npmjs.org/package/tarmac
[bower]: http://bower.io/
[tarmac-todomvc]: https://github.com/Wolfy87/todomvc/tree/feature-tarmac/architecture-examples/tarmac
[tests]: http://localhost:8000/tests/
