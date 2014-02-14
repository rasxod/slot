var _ = require('underscore'),
    i18n =  require('./i18n'),
    templateProvider = require('./templateProvider'),
    env = require('./env'),
    helperBlocks = env.requirePrivate('helperBlocks');

// Регистрирует все хелперы в хэндлебарсе
exports.registerHelpers = function(handlebars, blockHelpers) {
    // Инкремент для js to css нумерации
    handlebars.registerHelper('increment', function(options) {
        return options.hash.index + 1;
    });

    handlebars.registerHelper('_t', i18n._t);

    handlebars.registerHelper('_tt', i18n._tt);

    handlebars.registerHelper('_g', i18n._g);

    handlebars.registerHelper('ifand', function() {
        var options = arguments[arguments.length-1],
            args = [].slice.call(arguments, 0, arguments.length - 1);

        var value = _.reduce(args, function(acc, val) {
            return acc && val;
        }, true);

        return handlebars.helpers['if'].call(this, value, options);
    });

    helperBlocks(handlebars, templateProvider);
};