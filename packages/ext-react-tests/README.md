# reactor-tests

This package contains a suite of tests for @extjs/reactor.

## To Run

* Fork/clone this repo.
* `npm login --registry=https://npm.sencha.com --scope=@extjs` (Use your support portal credentials.  If using your username is your email address, replace "@" with "..".  For example, "developer..sencha.com")
* `npm install`
* `cd packages/reactor-tests`
* `ln -s /path/to/ext ext`
* `npm start`
* Open Sencha Test Studio at packages/reactor-tests

## To Add Tests:

1. Create a test component in src/tests
2. Add it to src/tests/index.js.  A route will automatically be created corresponding to the exported name here.
3. In Sencha Test Studio, add a Jasmine test under test/All_Tests.

