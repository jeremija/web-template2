define(['core/obj'], function(obj) {

    describe('test/js/core/obj-test.js', function() {
        describe('each()', function() {
            it('should iteratate through array\'s properties', function() {
                var arr = ['first', 'second', 'third'];

                var results = [];
                obj.each(arr, function(item, index) {
                    results.push({
                        item: item,
                        index: index
                    });
                });

                expect(results.length).to.be(3);
                expect(results[0].index).to.be(0);
                expect(results[0].item).to.be('first');

                expect(results[1].index).to.be(1);
                expect(results[1].item).to.be('second');

                expect(results[2].index).to.be(2);
                expect(results[2].item).to.be('third');
            });

            it('should iterate through object\'s own properties', function() {
                var myObject = Object.create({
                    hidden: 1
                });

                myObject.prop1 = 'first';
                myObject.prop2 = 'second';
                myObject.fcn = function() {};

                var results = [];
                obj.each(myObject, function(item, index) {
                    results.push({
                        item: item,
                        index: index
                    });
                });

                expect(results.length).to.be(3);

                expect(results[0].index).to.be('prop1');
                expect(results[0].item).to.be(myObject.prop1);

                expect(results[1].index).to.be('prop2');
                expect(results[1].item).to.be(myObject.prop2);

                expect(results[2].index).to.be('fcn');
                expect(results[2].item).to.be(myObject.fcn);
            });
        });
    });

});