# SLINKY - A Super Simple Javascript Testing Framework 

Slinky is a super simply js testing framework that allows you to create little mini 
functions to test your code and run them _sequentially_.  This means if you are 
testing out AJAX calls, you can use Slinky to try the first, wait for it to complete, 
then run the next test function, etc etc.  It's REAL easy and gives you pretty output.

## Setup 

* Include slinky.js in your testing page
* Add a div with id "output" on your testing page
* Encapsulate everything you want to test in functions
* Add test.done(); at the complete event inside each function

## Usage 

Instantiate a testing variable like sure:

    var test = new Slinky();

Next, set up your test cases:
 
    test.add('functionA()');			// yes, inside quotes like that!
    test.add('functionB()');			
    test.add('functionC()');			

Finally, run your tests:

	test.run();
	
* That's it for now!  *

