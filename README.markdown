# SLINKY - A Super Simple Javascript Testing Framework 

Slinky is a super simply js testing framework that allows you to create little mini 
functions to test your code and run them _sequentially_.  This means if you are 
testing out AJAX calls, you can use Slinky to try the first, wait for it to complete, 
then run the next test function, etc etc.  It's REAL easy and gives you pretty output.

## Setup 

* Include slinky.js in your testing page
* Add a div with id "output" on your testing page
* Add the following STYLEs to the HEAD of your testing page

## Styles

	<style>
	    .pass:before {
	    content: 'PASS: ';
	    color: green;
	    font-weight: bold;
	    }
 
	    .fail:before {
	    content: 'FAIL: ';
	    color: red;
	    font-weight: bold;
	    }

	    .error:before {
	    content: 'ERROR: ';
	    color: #AF7817;
	    font-weight: bold;
	    }
	</style>

## Usage 

Instantiate a testing variable like sure:

	var test = new Slinky();

Create test functions for each group of code to test.  There are two simple *assert* methods available for your test:

    test.assert(expr, description, failDetails);		// pass if expr is true, fail if not.  You can optionally pass a value or array of values to display
												// in the event something fails to give you guidance
												
	test.assertEq(val1, val2, description);			// pass if val1 == val2, fail if not
	
And then when you are done with your test code in a test function, use:

	test.done();
	
For example:

	function functionA() {
		var y = 100;
		var x = 200;
		test.assert(y!=x, 'y is not equal to x');						// OR test.assert(y!=x, 'y is not equal to x', [y,x]) to display the values of x and y if it fails
		test.assertEq(y, 100, 'y equals what I thought it should);
		test.done();
	}
	
The purpose of test.done() is to trigger the next test case in the list.  Without it, the test suite will end at the completion of that 
function.  This allows you to run an AJAX routine and issue test.done() in the callback to advance when it's complete.
	
If you want to visually break up the output, you can use a test.line() or test.line(msg) in your test cases:

    test.line();					// =>  ==============================
	test.line('Something')			// =>  ===== Something =====

Next, set up your test cases:
 
    test.add('functionA()');			// yes, inside quotes like that!
    test.add('functionB(123)');			
    test.add('functionC('zyz',123)');		

Finally, run your tests:

	test.run();
	
### Capturing JS Errors and AJAX

Slinky will capture JS errors as well as false expressions.  In the case of AJAX callbacks, however, Slinky don't know what to do.  
To handle AJAX callback error catching simply wrap your callback in a test.safe() closure like such:

	$.post('/this/is/a/url', {title; 'something'}, function(result){
		test.safe(function(){
			test.assert(result.title, 'A title exists');
			test.assertEq(result.title, 'something', 'the title has the expected value after post');
			test.done();
		})
	})
	
## That's it for now! 

