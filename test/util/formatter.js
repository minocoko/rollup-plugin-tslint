const Linter = require("tslint");

exports.createFormatter = function createFormatter (result) {
    class Formatter extends Linter.Formatters.AbstractFormatter {
        format(failures) {
            if (!result) return '';
            result.count = failures.length;
            result.failure = failures[0] && failures[0].failure;
            result.ruleName = failures[0] && failures[0].ruleName;
            return '';
        }
    }

    return Formatter
}