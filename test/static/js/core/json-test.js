define(['core/json'], function(json) {

    describe('test/js/core/json-test.js', function() {
        describe('parse()', function() {
            it('should be able to parse json', function() {
                var obj = json.parse('{"key": "value"}');
                expect(obj).to.be.an('object');
                expect(obj).to.have.property('key');
                expect(obj.key).to.be('value');
            });
            it('should return input if it fails to parse', function() {
                var input = '"key": "value"';
                var obj = json.parse(input);
                expect(obj).to.be(input);
            });
        });
        describe('stringify()', function() {
            it('should be able to stringify object to json', function() {
                var obj = {
                    key: 'value'
                };
                var string = json.stringify(obj);
                expect(string).to.be('{"key":"value"}');
            });
        });
    });

});