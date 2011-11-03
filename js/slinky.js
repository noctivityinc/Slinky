/**
 * Slinky
 *
 * @module slinky
 * @copyright (c) 2011 Noctivity Inc
 * @author Joshua Lippiner (jlippiner@noctivity.com)
 * @version 0.1.4
 */

function Slinky(options){
	
	var 
	output = document.getElementById('output');
	testArray = [],
	passed = 0,
	failed = 0,
	
	my = {
		
		add: function(fn) {
			testArray.push(fn);
		},
		
		run: function() {
			var d = currentTime;
			var h2 = document.createElement('h2');
      h2.appendChild( document.createTextNode('Test Run at '+d) );
      output.appendChild(h2);
			
			_run();
		},
		
		done: function() {
			_run();
		},
		
		safe: function(fn) {
			 try {
            fn.apply(this);
        } catch(e) {
            this.assert(false, e);
						_run();
        }
		},
		
		assert: function( outcome, explaination, failDisplay) {
        outcome ? passed++ : failed++;

        var li = document.createElement('li');
        li.className = outcome ? 'pass' : 'fail';
        li.appendChild( document.createTextNode( explaination ) );

				if(!outcome && failDisplay!==undefined) {
					var ul = document.createElement('ul');
					if(typeof failDisplay == 'object') {
						for(i=0;i<failDisplay.length;i++) {
			        var li2 = document.createElement('li');
			        li2.appendChild( document.createTextNode( failDisplay[i] ) );
							ul.appendChild(li2);
						}
					} else {
		        var li2 = document.createElement('li');
		        li2.appendChild( document.createTextNode( failDisplay ) );
						ul.appendChild(li2);
					}
					li.appendChild(ul);
				}

        output.appendChild(li);
    },

    assertEq: function(val1, val2, explaination) {
        if(val1==val2) {
            test.assert(true, explaination)
        } else {
            test.assert(false, explaination, [val1, val2]);
        }
    }
	};
	
	function _run() {
		if(testArray.length>0) {
			atest = testArray.shift();
			_runTest(atest);
		} else {
			_showResults();
		}
		
		return true;
	};
	
	function _runTest(aTest) {
			_test(aTest, function() {
				eval(aTest);
			})
	};
	
	function _test(msg, fn) {
        var h3 = document.createElement('h3');
        h3.appendChild( document.createTextNode( msg ) );
        output.appendChild(h3);

        if(fn!==undefined && typeof fn == 'function') {
            try {
                return fn.apply(this);
            } catch(e) {
                test.assert(false, e);
								_run();
            }
        }
    };

    function _showResults() {
        _test('Total Tests: '+(passed+failed)+', # Passed: '+passed+' # Failed: '+failed);
    }


	return my;
	
};
