
var path = require('path');

var env = require('../env');
env.setRootPath(path.join(__dirname, '..'));

var Application = require('../app');

module.exports = function() {
    var app = new Application();
    var slotConstructor = require('../slot');

    return {
        app: app,
        slot: slotConstructor(app, {
            moduleId: 'super_random_id'
        })
    };
};
