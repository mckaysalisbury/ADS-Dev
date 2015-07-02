(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('common', function () {
            var common = {};
            var nonWordCharacters = [' ', '/', ',', ')', '(', '.', ';'];
            /* jshint -W117 */
            common.contains = $.inArray;
            /* jshint +W117 */
            common.sanitize = function sanitize(input) {
                var output;
                if (!input) {
                    return input;
                }
                // input = input.split(' ').join('+');
                output = encodeURIComponent(input);
                return output;
            };
            common.getExampleDistinct = function getExampleDistinct(query, results, properties) {
                var result = [];
                if (!query) {
                    return result;
                }
                if (!results) {
                    return result;
                }
                var alreadyAdded = [];
                results.forEach(function (element) {
                    for (var i = 0; i < properties.length; i++) {
                        var v = common.getExample(query, element[properties[i]]);
                        if (v.example && common.contains(v.value, alreadyAdded) === -1) {
                            result.push(v);
                            alreadyAdded.push(v.value);
                        }
                    }
                }, this);
                return result;
            };
            common.getExample = function getExample(query, input) {
                if (!query || !input) {
                    return {};
                }
                return common.getExampleSanitized(query, input);
            };
            common.getExampleSanitized = function getExampleSanitized(query, input) {
                var indexOfQuery = input.toLowerCase().indexOf(query.toLowerCase());
                if (indexOfQuery === -1) {
                    return { 'value': query, 'example': null };
                }
                var fullText = getFullTextFromInput(query, input, indexOfQuery);
                var example = getSampleTextFromInput(query, input, indexOfQuery, fullText.length);
                // console.log({'query': query, 'input': input});
                // console.log({'value': fullText, 'example': example});
                return { 'value': fullText.toLowerCase(), 'example': example };
            };
            common.escapeHtml = function (input) {
                return input.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&#039;');
            };
            function getSampleTextFromInput(query, input, indexOfQuery, fullTextLength) {
                var startIndex = indexOfQuery - 25;
                var endIndex = indexOfQuery + 25 + fullTextLength;
                if (startIndex < 0) {
                    startIndex = 0;
                }
                else {
                    while (startIndex > 0 && common.contains(input[startIndex - 1], nonWordCharacters) === -1) {
                        startIndex--;
                    }
                }
                if (endIndex >= input.length) {
                    endIndex = input.length;
                }
                else {
                    while (endIndex < input.length && common.contains(input[endIndex], nonWordCharacters) === -1) {
                        endIndex++;
                    }
                }
                return input.substring(startIndex, endIndex);
            }
            function getFullTextFromInput(query, input, indexOfQuery) {
                var i = indexOfQuery + query.length;
                var fullText = query;
                while (input.length > i && common.contains(input[i], nonWordCharacters) === -1) {
                    fullText += input[i++];
                }
                return fullText;
            }
            return common;
        });
})();
