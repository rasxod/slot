
var rootPath = './',
    _ = require('underscore');

require('./polyfill');

exports.setRootPath = function(path) {
    rootPath = path;
    if (!rootPath.endsWith('/')) {
        rootPath = rootPath + '/';
    }
};

exports.getRootPath = function() {
    return rootPath;
};

function getBuildPath() {
    return rootPath + 'build/';
}


/**
 * Возвращает глобальный контекст среды исполнения (в node.js или браузере)
 *
 * @returns {global|window}
 */
function globals() {
    return typeof global != 'undefined' ? global : window;
}

exports.globals = globals;

/**
 * Запрашивает модуль относительно папки куда складываются собираемые файлы
 *
 * @param name
 * @returns {*}
 */
exports.requirePrivate = function(name) {
    return require(getBuildPath() + 'private/' + name + '.js');
};

globals().requirePrivate = exports.requirePrivate;

var isServer = typeof window == 'undefined';

/**
 * Определяем, Грым ли это (Грым это десктопная версия 2gis).
 */
exports.isGrym = typeof DGOfflineAPI != 'undefined' && DGOfflineAPI.systemContext;
exports.isServer = isServer;
exports.isClient = !isServer;

function envRequire(serverName, clientName) {
    if (isServer) {
        return require(serverName);
    } else {
        if (!clientName) {
            clientName = serverName.charAt(0).toUpperCase() + serverName.substr(1);
            clientName = window[clientName] ? clientName : serverName;
        }
        return window[clientName];
    }
}


// ---- expose same functions as globals -----

globals().envRequire = envRequire;

if (!Object.freeze) Object.freeze = _.identity;

