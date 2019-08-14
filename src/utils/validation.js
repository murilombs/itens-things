"use strict";
exports.__esModule = true;
var Validacao = /** @class */ (function () {
    function Validacao() {
        this.errors = [];
    }
    Validacao.prototype.isRequired = function (value, message) {
        if (!value || value.length <= 0) {
            this.errors.push({ message: message });
        }
    };
    Validacao.prototype.hasMinLen = function (value, min, message) {
        if (!value || value.length < min) {
            this.errors.push({ message: message });
        }
    };
    Validacao.prototype.hasMaxLen = function (value, max, message) {
        if (!value || value.length > max) {
            this.errors.push({ message: message });
        }
    };
    Validacao.prototype.error = function () {
        return this.errors;
    };
    Validacao.prototype.clear = function () {
        this.errors = [];
    };
    Validacao.prototype.isValid = function () {
        return this.errors.length == 0;
    };
    return Validacao;
}());
exports["default"] = new Validacao();
