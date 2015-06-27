/* jshint -W117, -W030 */
describe('SearchByPurposeController', function () {
    var controller;

    beforeEach(function () {
        bard.appModule('app.searchByPurpose');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'searchformservice');
    });

    beforeEach(function () {
        controller = $controller('SearchByPurposeController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('typeahead', function () {

        function callGetExample(query, input) {
            var results = [];
            results.push({'purpose': input});
            var data = {'results': results, 'meta': { 'query': [query]}};
            return controller.transformPurpose(data)[0];
        }

        describe('getExample', function () {
            it('should return no data when no data is passed', function () {
                expect(callGetExample(null, null)).to.be.empty;
            });

            it('should exact value and exact example when only that is passed', function () {
                var result = callGetExample('test', 'test');
                expect(result['value']).to.equal('test');
                expect(result['example']).to.equal('test');
            });

            it('should include full word when only only passed a piece', function () {
                var result = callGetExample('tes', 'test');
                expect(result['value']).to.equal('test');
                expect(result['example']).to.equal('test');
            });

            it('should include full word when only only passed a piece but has additional content', function () {
                var result = callGetExample('tes', 'test 123');
                expect(result['value']).to.equal('test');
                expect(result['example']).to.equal('test 123');
            });

            it('should include 25 characters on either side plus words on both sides', function () {
                var result = callGetExample('blah', 'This is a test the should contain a lot ' +
                    'of text in order to find out that ' +
                    'blah is included and plenty of text on either side is also included.');
                expect(result['value']).to.equal('blah');
                expect(result['example']).to.equal('in order to find out that blah is included and plenty of');
            });

            it('should handle spaces properly', function () {
                var result = callGetExample('blah and', 'This contains blah and other stuff');
                expect(result['value']).to.equal('blah and');
                expect(result['example']).to.equal('This contains blah and other stuff');
            });

            it('should handle / properly', function () {
                var result = callGetExample('blah and', 'This contains blah and/be other stuff');
                expect(result['value']).to.equal('blah and');
                expect(result['example']).to.equal('This contains blah and/be other stuff');
            });
            it('should handle , properly', function () {
                var result = callGetExample('blah and', 'This contains blah and, other stuff');
                expect(result['value']).to.equal('blah and');
                expect(result['example']).to.equal('This contains blah and, other stuff');
            });
        });
    });
});
