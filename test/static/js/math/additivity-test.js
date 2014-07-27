define(['math/additivity'], function(additivity) {

    describe('math/additivity', function() {
        describe('add()', function() {
            it('should return sum of first two arguments', function() {
                expect(additivity.add(3, 5)).to.be(8);
            });
        });

    });

});