"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class Helpers {
    static sendResponse(status, data, err) {
        var _a;
        throw new common_1.HttpException({
            statusCode: status,
            data: data,
            message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : err,
        }, status);
    }
    static sendOk(data, message = 'Record Retrived Successfully') {
        return Helpers.sendResponse(common_1.HttpStatus.OK, data, message);
    }
    static sendCreated(data, message = 'Record Created Successfully') {
        return Helpers.sendResponse(common_1.HttpStatus.OK, data, message);
    }
    static sendUpated(data, message = 'Record Updated Successfully') {
        return Helpers.sendResponse(common_1.HttpStatus.OK, data, message);
    }
    static sendDeleted(message = 'Record Deleted Successfully') {
        return Helpers.sendResponse(common_1.HttpStatus.OK, null, message);
    }
    static sendNotFound(message = 'Record Not Found') {
        return Helpers.sendResponse(common_1.HttpStatus.NOT_FOUND, null, message);
    }
    static sendNotAcceptable(message = 'Record Not Acceptable') {
        return Helpers.sendResponse(common_1.HttpStatus.NOT_ACCEPTABLE, null, message);
    }
    static sendAlreadyExist(message = 'Record already exists') {
        return Helpers.sendResponse(common_1.HttpStatus.NOT_ACCEPTABLE, null, message);
    }
    static sendBadRequest(err = 'Bad Request') {
        return Helpers.sendResponse(common_1.HttpStatus.BAD_REQUEST, null, err);
    }
    static hasNumber(str) {
        return /\d/.test(str);
    }
    static hasUpper(str) {
        return /[A-Z]/.test(str);
    }
    static hasLower(str) {
        return /[a-z]/.test(str);
    }
    static hasSpecial(str) {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
    }
    static hasSpace(str) {
        return /\s/.test(str);
    }
    static currentDate() {
        return new Date();
    }
    static ucFirst(content) {
        return content.charAt(0).toUpperCase() + content.slice(1);
    }
    static toFixed(amount, decimal = 2) {
        return amount.toFixed(decimal);
    }
}
exports.default = Helpers;
//# sourceMappingURL=helpers.helper.js.map