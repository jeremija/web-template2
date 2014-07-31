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
        describe('copy()', function() {
            it('should copy properties from one object to another', function() {
                var dest = {
                    a: 1,
                    b: 2,
                    c: 3
                };

                var ret = obj.copy(dest, {
                    b: 4,
                    d: 5
                });

                expect(ret).to.be(dest);
                expect(dest.a).to.be(1);
                expect(dest.b).to.be(4);
                expect(dest.c).to.be(3);
                expect(dest.d).to.be(5);
            });
        });
    });

});