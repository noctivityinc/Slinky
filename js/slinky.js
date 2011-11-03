function Slinky(){

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
			if(testArray.length>0) {
				atest = testArray.shift();
				_runTest(atest);
			} else {
				_showResults();
			}
			
			return true;
		},
		
		done: function() {
			return this.run();
		},
		
		assert: function( outcome, explaination ) {
        outcome ? passed++ : failed++;

        var li = document.createElement('li');
        li.className = outcome ? 'pass' : 'fail';
        li.appendChild( document.createTextNode( explaination ) );
        output.appendChild(li);
    },

    assertEq: function(val1, val2, explaination) {
        if(val1==val2) {
            test.assert(true, explaination)
        } else {
            test.assert(false, explaination + ' ('+val1+ ' != '+val2+')');
        }
    }
	};
	
	function _runTest(aTest) {
			_test(aTest, function() {
				eval(aTest);
			})
	}
	
	function _test(msg, fn) {
        var h3 = document.createElement('h3');
        h3.appendChild( document.createTextNode( msg ) );
        output.appendChild(h3);

        if(fn!==undefined && typeof fn == 'function') {
            try {
								console.log(fn);
                return fn.apply(this);
            } catch(e) {
                test.assert(false, e);
								this.done();
            }
        }
    };

    function _showResults() {
        _test('Total Tests: '+(passed+failed)+', # Passed: '+passed+' # Failed: '+failed);
    }

	// bind errors on page
	window.onerror = function() {
	  assert(false, arguments[0])
	  return true;
	}

	return my;
	
};
