"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUrl = exports.getDominio = exports.initialize = void 0;
var DOMINIO = 'covindex.uncoma.edu.ar';
function initialize(_a) {
    var dominio = _a.dominio;
    DOMINIO = dominio;
}
exports.initialize = initialize;
function getDominio() {
    return DOMINIO;
}
exports.getDominio = getDominio;
function makeUrl(resource, id) {
    if (id === void 0) { id = null; }
    var url = '${DOMINIO}/${resource}';
    if (id) {
        url += '/${id}';
    }
    return url;
}
exports.makeUrl = makeUrl;
//# sourceMappingURL=config.js.map